"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDataset } from '@/app/components/DatasetContextProvider';
import { fetchGPSDataMin, fetchGPSDataMax } from '@/service/dataService';

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
  const { selectedDataset, vehicleWidth } = useDataset();

  useEffect(() => {
    // Dynamically import leaflet to avoid SSR issues
    import('leaflet').then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  const fetchGPSData = async (min: boolean, selected: string) => {
    return min ? fetchGPSDataMin(selected) : fetchGPSDataMax(selected);
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
    queryKey: ["gpsData", min, selectedDataset],
    queryFn: () => fetchGPSData(min, selectedDataset),
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

    if (width - number < 0) {
      // No reserve
      className += " bg-red-500";
    } else if (width - number - 50 > 0) {
      // Reserve 50 cm
      className += " bg-green-500";
    } else {
      // Reserve less than 50 cm
      className += " bg-yellow-500";
    }

    return L.divIcon({
      className,
      html: "<div class='w-4 h-4 rounded-full'></div>",
      iconSize: [16, 16],
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
      <div className="border border-gray-400 w-full h-full p-4 rounded-lg bg-gray-100 shadow-xl">
        {L && (
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
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