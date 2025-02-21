"use client";

import { useDataset } from '@/app/providers/DatasetContextProvider';
import { useTranslations } from 'next-intl';

export default function DatasetSelection() {
  const t = useTranslations("pages.map.sidePanel.dataset");
  const { selectedDataset, setSelectedDataset, options, refreshOptions } = useDataset();

  return (
    <div className="mt-4 border border-gray-4000 w-full p-4 rounded-lg bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-2 text-black text-center">
        {t("select")}
      </h2>
      <select
        value={selectedDataset}
        onChange={(e) => setSelectedDataset(e.target.value)}
        className="border p-2 rounded w-full text-black"
      >
        {options.map((item) => (
          <option key={item} value={item.toLowerCase()}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}