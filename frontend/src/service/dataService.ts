export const fetchGPSDataMin = async (selected: string) => {
  try {
    const response = await fetch(
      `https://storagegrid.eu/api/data/reduced/min/${selected}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch GPS data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching GPS data:", error);
    return null;
  }
};

export const fetchGPSDataMax = async (selected: string) => {
  try {
    const response = await fetch(
      `https://storagegrid.eu/api/data/reduced/max/${selected}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch GPS data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching GPS data:", error);
    return null;
  }
};

export const fetchOptions = async () => {
  const response = await fetch("https://storagegrid.eu/api/data/options");

  if (!response.ok) {
    throw new Error("Error fetching options");
  }

  const data = await response.json();
  return data; // Assuming the response is an array of strings
};

export const sendFileToBackend = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://storagegrid.eu/api/add", {
    method: "POST",
    body: formData, // Send the form data with the file
  });

  if (!response.ok) {
    throw new Error("Error uploading file");
  }

  const data = await response.json();
  return data; // Assuming the response is in JSON format
};

export const checkFileProcessingStatus = async (filename: string) => {
  const response = await fetch(`https://storagegrid.eu/api/data/status?filename=${filename}`);

  if (!response.ok) {
    throw new Error("Error checking file processing status");
  }

  const data = await response.json();
  return data.isProcessed; // Assuming the response contains an isProcessed boolean
};