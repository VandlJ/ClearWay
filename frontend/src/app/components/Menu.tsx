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
            { name: 'Technický automobil', width: 230 },
            { name: 'Automobilový žebřík', width: 240 },
            { name: 'Cisternová automobilová stříkačka', width: 250 }
          ])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-72 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
            <img src="/icons/firetruck.png" alt="Hasiči" className="mx-auto mb-4 w-20 h-20" />
            <h2 className="text-3xl font-semibold text-black">Hasiči</h2>
            <p className="text-gray-500 text-xl">150</p>
          </button>
          <button onClick={() => handleButtonClick('Záchranná služba', [
            { name: 'Sanitní vůz typu A', width: 200 },
            { name: 'Sanitní vůz typu B', width: 220 },
            { name: 'Sanitní vůz typu C', width: 240 },
            { name: 'Rendez-vous', width: 190 }
          ])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-72 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
            <img src="/icons/ambulance.png" alt="Záchranná služba" className="mx-auto mb-4 w-20 h-20" />
            <h2 className="text-3xl font-semibold text-black">Záchranná služba</h2>
            <p className="text-gray-500 text-xl">155</p>
          </button>
          <button onClick={() => handleButtonClick('Policie', [
            { name: 'Osobní vozidlo', width: 185 },
            { name: 'Dodávka', width: 205 },
            { name: 'Transportér', width: 220 },
            { name: 'Speciál', width: 250 }
          ])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-72 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
            <img src="/icons/police-car.png" alt="Policie" className="mx-auto mb-4 w-20 h-20" />
            <h2 className="text-3xl font-semibold text-black">Policie</h2>
            <p className="text-gray-500 text-xl">158</p>
          </button>
    
          {popupVisible && <Popup title={popupTitle} options={popupOptions} onClose={() => setPopupVisible(false)} />}
        </div>
      );
}
