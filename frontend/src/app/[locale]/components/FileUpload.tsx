"use client";

import { useState } from 'react';
import { sendFileToBackend } from '@/service/dataService';
import { useDataset } from '@/app/providers/DatasetContextProvider';
import { useTranslations } from 'next-intl';

export default function FileUpload() {
  const t = useTranslations("pages.map.sidePanel.fileUpload");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { refreshOptions } = useDataset();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setError(null);
      setSuccess(null);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setError(null);
    setSuccess(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError(t("messages.noFile"));
      return;
    }

    try {
      await sendFileToBackend(file);
      setSuccess(t("messages.uploadSuccess"));
      refreshOptions();
    } catch {
      setError(t("messages.uploadError"));
    }
  };

  return (
    <div className="mt-4 border border-gray-4000 w-full p-4 rounded-lg bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-2 text-black text-center">{t("title")}</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="bg-blue-500 text-white hover:bg-blue-600 transform transition-transform duration-400 hover:-translate-y-1 hover:shadow-lg px-4 py-2 w-full rounded-lg shadow-lg flex items-center justify-center cursor-pointer"
      >
        <span>{t("selectButton")}</span>
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