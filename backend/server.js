const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { preprocessingDir, getDatasetPath } = require("./config/paths");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

app.use(cors());

function parseCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push({
          gps: {
            n: parseFloat(row.GPS1),
            e: parseFloat(row.GPS2),
          },
          timestamp: new Date(`1970-01-01T${row.time}Z`),
          size: {
            left: parseFloat(row.A),
            width: parseFloat(row.B),
            right: parseFloat(row.C),
          },
        });
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// Helper function to parse "HH:MM:SS" into a Date object
function parseTime(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds, 0);
  return date;
}

function parseCSVFileReduced(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push({
          gps: {
            n: parseFloat(row.GPS1),
            e: parseFloat(row.GPS2),
          },
          size: parseInt(row.sum_ABC),
          timestamp: parseTime(row.time),
        });
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

app.get("/data/options", (req, res) => {
  const directoryPath = path.join(preprocessingDir, "source");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read source directory" });
    }

    // Extract base names from files in the source directory
    const csvFiles = files
      .filter((file) => file.endsWith(".csv")) // Keep only .csv files
      .map((file) => path.basename(file, ".csv")); // Remove .csv extension

    // Check if corresponding max/min snapped files exist in the generated folder
    const validFiles = csvFiles.filter((file) => {
      const maxFile = path.join(preprocessingDir, `max_${file}_snapped.csv`);
      const minFile = path.join(preprocessingDir, `min_${file}_snapped.csv`);
      return fs.existsSync(maxFile) && fs.existsSync(minFile);
    });

    res.json(validFiles);
  });
});

app.get("/data/reduced/:type/:file", async (req, res) => {
  try {
    const { type, file } = req.params;

    if (!["min", "max"].includes(type)) {
      return res
        .status(400)
        .json({ error: "Invalid type. Use 'min' or 'max'." });
    }

    const filePath = getDatasetPath(type, file);
    const data = await parseCSVFileReduced(filePath);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to load data" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "preproccessing", "source");
    // Ensure the directory exists, or create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
    }
    cb(null, uploadDir); // Set the destination
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  },
});

const upload = multer({ storage });

app.post("/add", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // File uploaded successfully
  console.log("Uploaded file:", req.file);

  // You can also return the file information or something else
  res.json({ message: "File uploaded successfully", file: req.file });
  setImmediate(() => {
    console.log(`Running script for ${req.file.filename}...`);
    /*const command = `ls ${req.file.destination}`;
    console.log(`Executing command: ${command}`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Script error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        return;
      }
      console.log(`Script output:\n${stdout}`);
    });*/

    // reduce
    exec(
      `python3 preproccessing/csv_reduce.py ${req.file.path}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Script error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Script stderr: ${stderr}`);
          return;
        }
        console.log(`Script output: ${stdout}`);
      }
    );
    // align
    exec(
      `python3 preproccessing/align_points.py ${req.file.originalname}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Script error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Script stderr: ${stderr}`);
          return;
        }
        console.log(`Script output: ${stdout}`);
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});