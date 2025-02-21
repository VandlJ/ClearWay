"use client";

import { useDataset } from '@/app/providers/DatasetContextProvider';
import { useTranslations } from 'next-intl';

export default function VehicleWidthInput() {
  const t = useTranslations("pages.map.sidePanel");

  const { vehicleWidth, setVehicleWidth, vehicleName } = useDataset();

  return (
    <div className="border border-gray-4000 w-full p-4 rounded-lg bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-black text-center">
        {t("vehicleWidth")}
      </h2>
      <div className="flex justify-center mb-2">
        <img src="/icons/vehicle.png" alt="Vehicle Icon" className="w-12 h-12" />
      </div>
      {/* <p className="text-center text-black mb-2">{vehicleName}</p> */}
      <div className="flex items-center justify-center space-x-2">
        <input
          type="text"
          value={vehicleWidth}
          onChange={(e) => setVehicleWidth(e.target.value)}
          className="border p-2 rounded w-1/2 text-black text-lg text-center"
        />
      </div>
    </div>
  );
}