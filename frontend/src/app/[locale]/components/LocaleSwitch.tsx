"use client";

import { Locale } from "@/i18n/config";
import { Link } from "@/i18n/routing";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

type LocaleSwitchProps = {
  className?: string;
};

/**
 * LocaleSwitch component that allows switching between Czech and German languages
 * while maintaining the current visual styling.
 */
export default function LocaleSwitch({ className }: LocaleSwitchProps) {
  return (
    <div className={clsx("flex items-center space-x-1", className)}>
      <LocaleLink locale="cs" />
      <LocaleLink locale="en" />
    </div>
  );
}

/**
 * LocaleLink component that renders a single language switch button
 * with the appropriate styling based on the current locale.
 */
function LocaleLink({ locale }: { locale: Locale }) {
  const currentLocale = useLocale();
  const pathname = usePathname();

  // Handle homepage case
  const pathnameWithoutLocale =
    pathname === `/${currentLocale}` ? "/" : pathname.replace(`/${currentLocale}`, "");

  const displayText = locale === "cs" ? "CZ" : "EN";

  return (
    <Link
      href={pathnameWithoutLocale}
      locale={locale}
      className={clsx(
        "px-1 font-bold transition-opacity duration-300",
        currentLocale === locale ? "opacity-100" : "opacity-60"
      )}
    >
      {displayText}
    </Link>
  );
}