"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DatasetContextType {
  selectedDataset: string;
  setSelectedDataset: (dataset: string) => void;
  vehicleWidth: string;
  setVehicleWidth: (width: string) => void;
  isMinMode: boolean;
  setIsMinMode: (isMin: boolean) => void;
  vehicleName: string;
  setVehicleName: (name: string) => void;
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
  const [vehicleName, setVehicleName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('vehicleName') || '';
    }
    return '';
  });
  const [isMinMode, setIsMinMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('minMaxToggle');
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vehicleName', vehicleName);
      localStorage.setItem('vehicleWidth', vehicleWidth);
      localStorage.setItem('minMaxToggle', JSON.stringify(isMinMode));
    }
  }, [isMinMode, vehicleName, vehicleWidth]);

  return (
    <DatasetContext.Provider value={{ 
      selectedDataset, 
      setSelectedDataset, 
      vehicleWidth, 
      setVehicleWidth,
      isMinMode,
      setIsMinMode,
      vehicleName,
      setVehicleName
    }}>
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