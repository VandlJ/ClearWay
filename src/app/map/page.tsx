"use client";

import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import MapContainer and TileLayer to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function MapPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const width = searchParams.get('width');

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for selected option */}
      <div className="w-1/4 min-w-[300px] bg-white p-4 shadow-lg">
        <h1 className="text-4xl font-bold text-black mb-4">Selected Option</h1>
        {name && width ? (
          <div>
            <p className="text-2xl text-black">{name}</p>
            <p className="text-xl text-gray-500">{width} cm</p>
          </div>
        ) : (
          <p className="text-xl text-gray-500">No option selected</p>
        )}
      </div>

      {/* Map section */}
      <div className="w-3/4">
        <MapContainer center={[49.7475, 13.3776]} zoom={13} className="h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
} 