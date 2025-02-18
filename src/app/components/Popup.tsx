import React from 'react';
import Portal from './Portal';

interface PopupProps {
  title: string;
  onClose: () => void;
  options: string[];
}

export default function Popup({ title, onClose, options }: PopupProps) {
  return (
    <Portal>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-70 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-8 shadow-lg mx-4 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {options.map((option, index) => (
            <button key={index} className="bg-gray-100 p-4 rounded-lg shadow text-black">
              {option}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="bg-red-500 text-white p-2 rounded">Zavřít</button>
      </div>
    </div>
    </Portal>
  );
}
