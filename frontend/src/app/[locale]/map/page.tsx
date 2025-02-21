"use client";

import SidePanel from '@/app/[locale]/components/SidePanel';
import MapPanel from '@/app/[locale]/components/MapPanel';

export default function MapPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidePanel />
      <MapPanel />
    </div>
  );
} 