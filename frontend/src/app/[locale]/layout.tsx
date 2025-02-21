import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { ReactQueryProvider } from "@/app/providers/ReactQueryProvider";
import { DatasetProvider } from "@/app/providers/DatasetContextProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

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
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${poppins.variable} antialiased min-h-screen bg-gradient-to-br from-gray-100 to-gray-200`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
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