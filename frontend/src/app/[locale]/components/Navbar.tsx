"use client";

import { useTranslations } from "next-intl";
import LocaleSwitch from "./LocaleSwitch";

export default function Navbar() {
  const t = useTranslations("common.navbar");

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold">
          {t("appName")}
        </div>
        <a href="/" className="hover:underline">
          {t("links.home")}
        </a>
        <a href="/map" className="hover:underline">
          {t("links.map")}
        </a>
        {/* Add more navigation links here */}
      </div>
      <div className="flex items-center space-x-4">
        <LocaleSwitch />
        {/* Add user profile, notifications, etc. here */}
      </div>
    </nav>
  );
}