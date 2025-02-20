import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/app/providers/ReactQueryProvider";
import { DatasetProvider } from "@/app/providers/DatasetContextProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ClearWay",
  description: "Emergency vehicle routing application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${poppins.variable} antialiased min-h-screen bg-gradient-to-br from-gray-100 to-gray-200`}
      >
        <ReactQueryProvider>
          <DatasetProvider>
            {children}
          </DatasetProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}