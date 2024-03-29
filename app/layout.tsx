import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "@/app/context/toaster-context";
import AuthContext from "@/app/context/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instant Messaging",
  description: "An Instant Messaging Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
