import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
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
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-white text-black dark:bg-neutral-900 dark:text-white transition-colors duration-300`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange={true}
          >
            <Toaster />
            {/* <Nav /> */}
            {children}
            {/* <Header /> */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
