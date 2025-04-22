import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { ReactQueryProvider } from "@/app/providers/ReactQueryProvider";
import { DatasetProvider } from "@/app/providers/DatasetContextProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, locales } from "@/i18n/config";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ClearWay",
  description: "Emergency vehicle routing application",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure the locale is one of the supported locales
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Type assertion to ensure locale is treated as a valid locale type
  const validLocale = locale as Locale;
  
  const messages = await getMessages();

  return (
    <html lang={validLocale}>
      <body
        className={`${poppins.variable} antialiased min-h-screen bg-gradient-to-br from-gray-100 to-gray-200`}
      >
        <NextIntlClientProvider locale={validLocale} messages={messages}>
          <ReactQueryProvider>
            <DatasetProvider>
              {children}
            </DatasetProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}