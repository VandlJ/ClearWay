"use client";

import React, { useState } from "react";
import Popup from "./Popup";
import { useTranslations } from "next-intl";

interface Option {
  name: string;
  width: number;
}

export default function Menu() {
  const t = useTranslations("pages.home.menu");

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
        <button onClick={() => handleButtonClick(t("tile1.title"), [
          { name: t("tile1.option1"), width: 200 },
          { name: t("tile1.option2"), width: 230 },
          { name: t("tile1.option3"), width: 240 },
          { name: t("tile1.option4"), width: 250 }
        ])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-72 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
          <img src="/icons/firetruck.png" alt="Hasiči" className="mx-auto mb-4 w-20 h-20" />
          <h2 className="text-3xl font-semibold text-black">
            {t("tile1.title")}
          </h2>
        </button>
        <button onClick={() => handleButtonClick(t("tile2.title"), [
          { name: t("tile2.option1"), width: 200 },
          { name: t("tile2.option2"), width: 220 },
          { name: t("tile2.option3"), width: 240 },
          { name: t("tile2.option4"), width: 190 }
        ])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-72 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
          <img src="/icons/ambulance.png" alt="Záchranná služba" className="mx-auto mb-4 w-20 h-20" />
          <h2 className="text-3xl font-semibold text-black">
            {t("tile2.title")}
          </h2>
        </button>
        <button onClick={() => handleButtonClick(t("tile3.title"), [
          { name: t("tile3.option1"), width: 185 },
          { name: t("tile3.option2"), width: 205 },
          { name: t("tile3.option3"), width: 220 },
          { name: t("tile3.option4"), width: 250 }
        ])} className="bg-white shadow-md rounded-lg p-6 text-center hover:bg-gray-200 w-80 h-72 transform transition-transform duration-400 hover:-translate-y-2 hover:shadow-lg">
          <img src="/icons/police-car.png" alt="Policie" className="mx-auto mb-4 w-20 h-20" />
          <h2 className="text-3xl font-semibold text-black">
            {t("tile3.title")}
          </h2>
        </button>
  
        {popupVisible && <Popup title={popupTitle} options={popupOptions} onClose={() => setPopupVisible(false)} />}
      </div>
    );
}
