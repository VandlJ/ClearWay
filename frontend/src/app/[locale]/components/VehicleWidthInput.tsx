"use client";

import { useDataset } from '@/app/providers/DatasetContextProvider';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function VehicleWidthInput() {
  const t = useTranslations("pages.map.sidePanel");

  const { vehicleWidth, setVehicleWidth } = useDataset();

  return (
    <div className="border border-gray-4000 w-full p-4 rounded-lg bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-black text-center">
        {t("vehicleWidth")}
      </h2>
      <div className="flex justify-center mb-2">
        <Image src="/icons/vehicle.png" alt="Vehicle Icon" width={48} height={48} />
      </div>
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