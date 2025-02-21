import { useTranslations } from "next-intl";

export default function MapLegend() {
  const t = useTranslations("pages.map.legend");
  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-lg shadow-lg border border-gray-300 opacity-85">
      <h3 className="text-sm text-black font-semibold mb-2">
        {t("title")}
      </h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-red-700 shadow-sm"></div>
          <span className="text-xs text-black">
            {t("red")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-yellow-700 shadow-sm"></div>
          <span className="text-xs text-black">
            {t("yellow")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-green-700 shadow-sm"></div>
          <span className="text-xs text-black">
            {t("green")}
          </span>
        </div>
      </div>
    </div>
  );
}