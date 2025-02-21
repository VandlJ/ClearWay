"use client";

import { useDataset } from '@/app/providers/DatasetContextProvider';

export default function DatasetSelection() {
  const { selectedDataset, setSelectedDataset, options, refreshOptions } = useDataset();

  return (
    <div className="mt-4 border border-gray-4000 w-full p-4 rounded-lg bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-2 text-black text-center">Select Dataset</h2>
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