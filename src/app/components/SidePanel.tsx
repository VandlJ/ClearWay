"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function SidePanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vehicleWidth, setVehicleWidth] = useState(searchParams.get('width') || '');
  const [switchState, setSwitchState] = useState('MIN');
  const [selectedDataset, setSelectedDataset] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      // Implement file upload logic here
      console.log('Uploading:', file.name);
    }
  };

  const handleClearFile = () => {
    setFile(null);
  };

  return (
    <div className="w-1/6 min-w-[300px] bg-white p-4 shadow-lg flex flex-col items-center space-y-6">
      <div className="w-5/6 border p-4 rounded-lg">
        <button
          onClick={handleBackToHome}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transform transition-transform duration-400 hover:-translate-y-1 hover:shadow-lg w-full"
        >
          Back to Home
        </button>

        <div className="w-full mt-4">
          <h2 className="text-xl font-bold mb-2 text-black text-center">Vehicle Width</h2>
          <div className="flex items-center justify-center space-x-2">
            <img src="/icons/vehicle.png" alt="Vehicle Icon" className="w-6 h-6" />
            <input
              type="text"
              value={vehicleWidth}
              onChange={(e) => setVehicleWidth(e.target.value)}
              className="border p-2 rounded w-1/2 text-black"
            />
          </div>
        </div>

        <div className="w-full mt-4">
          <h2 className="text-xl font-bold mb-2 text-black text-center">Width Mode</h2>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-black">MIN</span>
            <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                checked={switchState === 'MAX'}
                onChange={() => setSwitchState(switchState === 'MIN' ? 'MAX' : 'MIN')}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                style={{ transform: switchState === 'MAX' ? 'translateX(100%)' : 'translateX(0)' }}
              />
              <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
            <span className="text-black">MAX</span>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">Selected mode: {switchState}</p>
        </div>

        <div className="w-full mt-4">
          <h2 className="text-xl font-bold mb-2 text-black text-center">Select Dataset</h2>
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="border p-2 rounded w-full text-black"
          >
            <option value="">Select a dataset</option>
            <option value="dataset1">Dataset 1</option>
            <option value="dataset2">Dataset 2</option>
            <option value="dataset3">Dataset 3</option>
          </select>
        </div>

        <div className="w-full mt-4 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2 text-black text-center">Upload CSV File</h2>
          <label className="bg-gray-200 text-black px-4 py-2 rounded cursor-pointer hover:bg-gray-300 transform transition-transform duration-400 hover:-translate-y-1 hover:shadow-lg">
            Choose File
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-sm text-black">{file ? file.name : "No file chosen"}</p>
            {file && (
              <button
                onClick={handleClearFile}
                className="text-red-500 text-sm hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <button
            onClick={handleUpload}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transform transition-transform duration-400 hover:-translate-y-1 hover:shadow-lg mt-2"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
} 