import React from 'react';
import { useRouter } from 'next/navigation';
import Portal from './Portal';
import { useDataset } from '@/app/providers/DatasetContextProvider';

interface Option {
  name: string;
  width: number; // width in centimeters
}

interface PopupProps {
  title: string;
  onClose: () => void;
  options: Option[];
}

export default function Popup({ title, onClose, options }: PopupProps) {
  const { setVehicleWidth, setVehicleName } = useDataset();
  const router = useRouter();

  const handleOptionClick = (option: Option) => {
    setVehicleWidth(option.width.toString());
    setVehicleName(option.name);
    router.push('/map');  // No need for query parameters
  };

  return (
    <Portal>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-70 backdrop-blur-sm">
        <div className="bg-white rounded-lg p-8 shadow-lg mx-4 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleOptionClick(option)}
                className="bg-gray-100 p-4 rounded-lg shadow text-black hover:bg-gray-200 transform transition-transform duration-400 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-lg font-semibold">{option.name}</div>
                <div className="text-sm text-gray-500">{option.width} cm</div>
              </button>
            ))}
          </div>
          <button onClick={onClose} className="bg-red-500 text-white p-2 rounded transform transition-transform duration-400 hover:-translate-y-1 hover:shadow-lg">Zavřít</button>
        </div>
      </div>
    </Portal>
  );
}