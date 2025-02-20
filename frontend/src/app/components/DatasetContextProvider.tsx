"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DatasetContextType {
  selectedDataset: string;
  setSelectedDataset: (dataset: string) => void;
  vehicleWidth: string;
  setVehicleWidth: (width: string) => void;
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export function DatasetProvider({ children }: React.PropsWithChildren) {
  const [selectedDataset, setSelectedDataset] = useState<string>('dataset');
  const [vehicleWidth, setVehicleWidth] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('vehicleWidth') || '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vehicleWidth', vehicleWidth);
    }
  }, [vehicleWidth]);

  return (
    <DatasetContext.Provider value={{ selectedDataset, setSelectedDataset, vehicleWidth, setVehicleWidth }}>
      {children}
    </DatasetContext.Provider>
  );
}

export const useDataset = () => {
  const context = useContext(DatasetContext);
  if (!context) {
    throw new Error('useDataset must be used within a DatasetProvider');
  }
  return context;
};