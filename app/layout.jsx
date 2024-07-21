import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/app/(routes)/Dashboard/_components/Header";
import Nav from "./_Components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EntPrep",
  description: "A Personalized Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster/>
          {/* <Nav/> */}
          {children}
        {/* <Header/> */}

        </body>
      </html>
    </ClerkProvider>
  );
}
