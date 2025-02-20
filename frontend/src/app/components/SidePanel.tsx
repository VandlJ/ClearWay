"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDataset } from '@/app/providers/DatasetContextProvider';
import VehicleWidthInput from './VehicleWidthInput';
import DatasetSelection from './DatasetSelection';
import FileUpload from './FileUpload';

export default function SidePanel() {
  const router = useRouter();
  const { isMinMode, setIsMinMode } = useDataset();
  const [switchState, setSwitchState] = useState(() => isMinMode ? 'MIN' : 'MAX');

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleSwitchChange = () => {
    const newState = switchState === 'MIN' ? 'MAX' : 'MIN';
    setSwitchState(newState);
    setIsMinMode(newState === 'MIN');
  };

  return (
    <div className="w-1/4 p-4 min-w-[300px] flex flex-col items-center space-y-6 ">
      <div className="border border-gray-4000 w-full h-full p-4 rounded-lg bg-gray-100 shadow-xl">
        <button
          onClick={handleBackToHome}
          className="bg-white text-black px-4 py-2 rounded-lg transform transition-transform duration-400 hover:-translate-y-1 hover:shadow-lg w-full border shadow-md text-lg"
        >
          Back to Home
        </button>

        <VehicleWidthInput />

        <div className="mt-4 border border-gray-4000 w-full p-4 rounded-lg bg-white shadow-lg">
          <h2 className="text-xl font-bold mb-2 text-black text-center">Width Mode</h2>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-black">MIN</span>
            <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                checked={switchState === 'MAX'}
                onChange={handleSwitchChange}
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
        </div>

        <DatasetSelection />

        <FileUpload />
      </div>
    </div>
  );
}