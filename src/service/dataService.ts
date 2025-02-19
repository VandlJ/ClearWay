export const fetchGPSDataMin = async (selected: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/data/reduced/min/${selected}`
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
        `http://localhost:3000/data/reduced/max/${selected}`
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
    const response = await fetch("http://localhost:3000/data/options");
  
    if (!response.ok) {
      throw new Error("Error fetching options");
    }
  
    const data = await response.json();
    return data; // Assuming the response is an array of strings
  };
  
  export const sendFileToBackend = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("http://localhost:3000/add", {
      method: "POST",
      body: formData, // Send the form data with the file
    });
  
    if (!response.ok) {
      throw new Error("Error uploading file");
    }
  
    const data = await response.json();
    return data; // Assuming the response is in JSON format
  };