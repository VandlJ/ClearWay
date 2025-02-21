import { useTranslations } from "next-intl";

export default function Title() {
  const t = useTranslations("pages.home");
  return (
    <div className="text-center my-12">
      <h1 className="text-6xl font-bold text-black">
        {t("title")}
      </h1>
      <p className="text-2xl text-gray-600 mt-2">
        {t("subtitle")}
      </p>
    </div>
  );
}
