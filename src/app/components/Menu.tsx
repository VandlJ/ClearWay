"use client";

import React, { useState } from "react";
import Popup from "./Popup";

interface Option {
  name: string;
  width: number;
}

export default function Menu() {
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [popupOptions, setPopupOptions] = useState<Option[]>([]);

    const handleButtonClick = (title: string, options: Option[]) => {
        setPopupTitle(title);
        setPopupOptions(options);
        setPopupVisible(true);
    };
    
    return (
        <div className="flex justify-center space-x-4 mt-8">
          <button onClick={() => handleButtonClick('Hasiči', [
            { name: 'Dopravní automobil', width: 200 },
            { name: 'Technický automobil', width: 220 },
            { name: 'Automobilový žebřík', width: 250 },
            { name: 'Cisternová automobilová stříkačka', width: 240 }
          ])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-48 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
            <img src="/icons/firetruck.png" alt="Hasiči" className="mx-auto mb-4 w-16 h-16" />
            <h2 className="text-2xl font-semibold text-black">Hasiči</h2>
            <p className="text-gray-500">150</p>
          </button>
          <button onClick={() => handleButtonClick('Záchranná služba', [
            { name: 'Sanitní vůz typu A', width: 180 },
            { name: 'Sanitní vůz typu B', width: 190 },
            { name: 'Sanitní vůz typu C', width: 200 },
            { name: 'Rendez-vous', width: 210 }
          ])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-48 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
            <img src="/icons/ambulance.png" alt="Záchranná služba" className="mx-auto mb-4 w-16 h-16" />
            <h2 className="text-2xl font-semibold text-black">Záchranná služba</h2>
            <p className="text-gray-500">155</p>
          </button>
          <button onClick={() => handleButtonClick('Policie', [
            { name: 'Osobní vozidlo', width: 170 },
            { name: 'Dodávka', width: 200 },
            { name: 'Transportér', width: 210 },
            { name: 'Speciál', width: 230 }
          ])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-48 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
            <img src="/icons/police-car.png" alt="Policie" className="mx-auto mb-4 w-16 h-16" />
            <h2 className="text-2xl font-semibold text-black">Policie</h2>
            <p className="text-gray-500">158</p>
          </button>
    
          {popupVisible && <Popup title={popupTitle} options={popupOptions} onClose={() => setPopupVisible(false)} />}
        </div>
      );
}
