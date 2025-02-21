"use client";

import Navbar from '@/app/[locale]/components/Navbar';
import SidePanel from '@/app/[locale]/components/SidePanel';
import MapPanel from '@/app/[locale]/components/MapPanel';

export default function MapPage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1">
        <SidePanel />
        <MapPanel />
      </div>
    </main>
  );
}