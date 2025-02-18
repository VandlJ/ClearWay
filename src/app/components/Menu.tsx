"use client";

import React, { useState } from "react";
import Popup from "./Popup";

export default function Menu() {
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [popupOptions, setPopupOptions] = useState<string[]>([]);

    const handleButtonClick = (title: string, options: string[]) => {
        setPopupTitle(title);
        setPopupOptions(options);
        setPopupVisible(true);
    };
    
    return (
        <div className="flex justify-center space-x-4 mt-8">
          <button onClick={() => handleButtonClick('Hasiči', ['Option A', 'Option B', 'Option C', 'Option D'])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-48 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
            <img src="/icons/firetruck.png" alt="Hasiči" className="mx-auto mb-4 w-16 h-16" />
            <h2 className="text-2xl font-semibold text-black">Hasiči</h2>
            <p className="text-gray-500">150</p>
          </button>
          <button onClick={() => handleButtonClick('Záchranná služba', ['Sanitní vůz typu A', 'Sanitní vůz typu B', 'Sanitní vůz typu C', 'Rendez-vous'])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-48 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
            <img src="/icons/ambulance.png" alt="Záchranná služba" className="mx-auto mb-4 w-16 h-16" />
            <h2 className="text-2xl font-semibold text-black">Záchranná služba</h2>
            <p className="text-gray-500">155</p>
          </button>
          <button onClick={() => handleButtonClick('Policie', ['Option X', 'Option Y', 'Option Z', 'Option W'])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-48 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
            <img src="/icons/police-car.png" alt="Policie" className="mx-auto mb-4 w-16 h-16" />
            <h2 className="text-2xl font-semibold text-black">Policie</h2>
            <p className="text-gray-500">158</p>
          </button>
    
          {popupVisible && <Popup title={popupTitle} options={popupOptions} onClose={() => setPopupVisible(false)} />}
        </div>
      );
}
