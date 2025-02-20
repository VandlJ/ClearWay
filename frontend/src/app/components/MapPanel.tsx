"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDataset } from '@/app/providers/DatasetContextProvider';
import { fetchGPSDataMin, fetchGPSDataMax } from '@/service/dataService';
import MapLegend from './MapLegend';

// Define the interface for the GPS data
interface GPSData {
  gps: {
    n: number;
    e: number;
  };
  size: number;
}

// Dynamically import MapContainer and TileLayer to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function MapPanel() {
  const [L, setL] = useState<any>(null);
  const { selectedDataset, vehicleWidth, isMinMode } = useDataset();

  useEffect(() => {
    // Dynamically import leaflet to avoid SSR issues
    import('leaflet').then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  const fetchGPSData = async (selected: string) => {
    return isMinMode ? fetchGPSDataMin(selected) : fetchGPSDataMax(selected);
  };

  const [min, setMin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('minMaxToggle');
      setMin(saved ? JSON.parse(saved) : false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('minMaxToggle', JSON.stringify(min));
    }
  }, [min]);

  const { data: gpsData = [], isLoading, isError } = useQuery<GPSData[]>({
    queryKey: ["gpsData", isMinMode, selectedDataset],
    queryFn: () => fetchGPSData(selectedDataset),
  });

  const center: [number, number] = [49.7475, 13.3776];

  const [number, setNumber] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const savedWidth = localStorage.getItem('vehicleWidth');
      return savedWidth ? parseInt(savedWidth) : parseInt(vehicleWidth);
    }
    return 0;
  });

  useEffect(() => {
    setNumber(parseInt(vehicleWidth));
  }, [vehicleWidth]);

const generateIcon = (width: number) => {
    let className = "custom-marker";
    let dotClass = "";

    if (width - number < 0) {
      // No reserve
      dotClass = "bg-red-500 border-red-700";
    } else if (width - number - 50 > 0) {
      // Reserve 50 cm
      dotClass = "bg-green-500 border-green-700";
    } else {
      // Reserve less than 50 cm
      dotClass = "bg-yellow-400 border-yellow-700";
    }

    return L.divIcon({
      className,
      html: `<div style="position: relative; left: 0px; top: 0px;">
               <div class='w-2.5 h-2.5 rounded-full ${dotClass} border shadow-sm'></div>
             </div>`,
      iconSize: [10, 10],
      iconAnchor: [5, 5]
    });
};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading GPS data</div>;
  }

  return (
    <div className="w-3/4 p-4">
      <div className="border border-gray-4000 w-full h-full p-4 rounded-lg bg-gray-100 shadow-xl">
        {L && (
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            style={{
              height: "100%",
              width: "100%",
              position: "relative"
            }}
            className='border border-gray-4000 rounded-lg shadow-sm'
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapLegend vehicleWidth={vehicleWidth} />
            {gpsData.map((option: GPSData, index: number) => (
              <Marker
                key={index}
                position={[option.gps.n, option.gps.e]}
                icon={generateIcon(option.size)}
              >
                <Popup>{selectedDataset}</Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}