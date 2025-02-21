"use client";

import { useTranslations } from "next-intl";
import LocaleSwitch from "./LocaleSwitch";
import Link from 'next/link';

export default function Navbar() {
  const t = useTranslations("common.navbar");

  return (
    <div className="w-full flex justify-center p-2">
      <nav className="bg-white border border-gray-300 rounded-full shadow-lg px-6 py-2 flex justify-between items-center max-w-3xl w-full">
        <div className="flex items-center space-x-6">
          <div className="text-lg font-bold text-gray-800">
            {t("appName")}
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-1 rounded-full hover:bg-gray-100"
            >
              {t("links.home")}
            </Link>
            <Link 
              href="/map" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-1 rounded-full hover:bg-gray-100"
            >
              {t("links.map")}
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <LocaleSwitch />
        </div>
      </nav>
    </div>
  );
}