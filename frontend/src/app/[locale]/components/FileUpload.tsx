"use client";

import { useState } from 'react';
import { sendFileToBackend, checkFileProcessingStatus } from '@/service/dataService';
import { useDataset } from '@/app/providers/DatasetContextProvider';
import { useTranslations } from 'next-intl';

export default function FileUpload() {
  const t = useTranslations("pages.map.sidePanel.dataset.upload");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { refreshOptions } = useDataset();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setError(null); // Clear any previous error
      setSuccess(null); // Clear any previous success message
    }
  };

  const handleUpload = async () => {
    try {
      if (file) {
        await sendFileToBackend(file);
        setSuccess(t("messages.success"));
        setFile(null); // Clear the file after successful upload
        pollFileProcessingStatus(file.name); // Poll for file processing status
        setTimeout(() => setSuccess(null), 3000); // Clear success message after 3 seconds
      } else {
        setError(t("messages.noFileError"));
        setTimeout(() => setError(null), 3000); // Clear error message after 3 seconds
      }
    } catch (e) {
      setError(t("messages.uploadError"));
      setTimeout(() => setError(null), 3000); // Clear error message after 3 seconds
    }
  };

  const pollFileProcessingStatus = async (filename: string) => {
    const maxRetries = 10;
    let retries = 0;
    let isProcessed = false;

    while (retries < maxRetries && !isProcessed) {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds
      isProcessed = await checkFileProcessingStatus(filename);
      retries++;
    }

    if (isProcessed) {
      refreshOptions(); // Refresh dataset options
    } else {
      setError(t("messages.timeoutError"));
      setTimeout(() => setError(null), 3000); // Clear error message after 3 seconds
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setError(null); // Clear any previous error
    setSuccess(null); // Clear any previous success message
  };

  return (
    <div className="mt-4 border border-gray-4000 w-full p-4 rounded-lg bg-white shadow-lg flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2 text-black text-center">
        {t("title")}
      </h2>
      <label className="bg-gray-200 text-black cursor-pointer hover:bg-gray-300 transform transition-transform duration-400 hover:-translate-y-1 hover:shadow-lg text-center px-4 py-2 w-full border border-gray-4000 rounded-lg shadow-lg">
        {t("chooseButton")}
        <input
          key={file ? file.name : 'file-input'} // Force re-render when file is cleared
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <div className="flex items-center space-x-2 mt-2">
        <p className="text-sm text-black">{file ? file.name : t("messages.noFileChosen")}</p>
        {file && (
          <button
            onClick={handleClearFile}
            className="text-red-500 text-sm hover:underline"
          >
            {t("clearButton")}
          </button>
        )}
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {success && <div className="text-green-500 text-sm mt-2">{success}</div>}
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white hover:bg-green-600 transform transition-transform duration-400 hover:-translate-y-1 hover:shadow-lg mt-2 px-4 py-2 w-full rounded-lg shadow-lg"
      >
        {t("uploadButton")}
      </button>
    </div>
  );
}