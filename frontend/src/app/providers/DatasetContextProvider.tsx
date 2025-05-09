"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { fetchOptions } from '@/service/dataService';

interface DatasetContextType {
  selectedDataset: string;
  setSelectedDataset: (dataset: string) => void;
  vehicleWidth: string;
  setVehicleWidth: (width: string) => void;
  isMinMode: boolean;
  setIsMinMode: (isMin: boolean) => void;
  vehicleName: string;
  setVehicleName: (name: string) => void;
  options: string[];
  refreshOptions: () => void;
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

  const [isMinMode, setIsMinMode] = useState<boolean>(true); // Set a default value directly

  useEffect(() => {
    // Move localStorage operations to useEffect
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('minMaxToggle');
      if (saved !== null) {
        setIsMinMode(JSON.parse(saved));
      }
    }
  }, []);

  const [options, setOptions] = useState<string[]>([]);

  const refreshOptions = async () => {
    const fetchedOptions = await fetchOptions();
    setOptions(fetchedOptions);
  };

  useEffect(() => {
    refreshOptions();
  }, []);

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
      setVehicleName,
      options,
      refreshOptions
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