"use client";

import SidePanel from '../components/SidePanel';
import MapPanel from '../components/MapPanel';

export default function MapPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidePanel />
      <MapPanel />
    </div>
  );
} 