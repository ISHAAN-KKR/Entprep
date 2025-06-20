"use client";
import React, { useState } from "react";
import { HeroParallax } from "@/app/_Components/Hero-Parallax";
// import { NavbarDemo } from "@/app/Components/Navbar";
import { motion } from "framer-motion";
import Logo from "@/public/translogo.png";
import Image from "next/image";
import Nav from "./_Components/Navbar";
import TextRevealByWord from "./_Components/Text-reveal";
import { TrendingUp, ArrowUpFromDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/ui/theme-toggle";

const products = [
  {
    title: "Market Understanding",
    thumbnail: "/market.jpg",
  },
  {
    title: "Innovative Vision",
    thumbnail: "/idea.jpg",
  },
  {
    title: "Business Plan",
    thumbnail: "/plan.jpg",
  },
  {
    title: "Capital Funding",
    thumbnail: "/capital.jpg",
  },
  {
    title: "Work Ethic",
    thumbnail: "/ethics.jpg",
  },
  {
    title: "Risk Management",
    thumbnail: "/risk.jpg",
  },
  {
    title: "Time Management",
    thumbnail: "/time.jpg",
  },
  {
    title: "Networking Skills",
    thumbnail: "/network.jpg",
  },
  {
    title: "Team Leadership",
    thumbnail: "/lead.jpg",
  },
];
const page = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <>
      {!loading ? (
        <>
          <Nav />

          <ThemeProvider>
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
          </ThemeProvider>

          <section
            id="hero"
            className="relative bg-[url('/banner.jpg')] bg-cover bg-center bg-no-repeat opacity-90"
          >
            <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

            <div className=" relative mx-auto max-w-screen-xl px-4 py-40 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
              <div className="max-w-2xl h-[25rem] text-center ltr:sm:text-left rtl:sm:text-right bg-black shadow-lg rounded-lg p-16 ">
                <h1 className="text-3xl font-extrabold text-neutral-100 sm:text-5xl">
                  Engage, Learn,
                  <strong className="block font-extrabold text-rose-500">
                    {" "}
                    Succeed in Business{" "}
                  </strong>
                </h1>

                <p className="mt-4 max-w-lg text-neutral-50 sm:text-xl/relaxed">
                  Unlock the tools you need to succeed. From creativity to
                  strategic thinking, our engaging system makes mastering
                  entrepreneurship fun and effective.
                </p>

                <div className="mt-8 flex flex-wrap gap-4 items-center text-center pb-5">
                  <a
                    href="/Path"
                    className="block w-full rounded mx-auto bg-rose-600 px-12 py-3 text-sm items-center font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* <HeroParallax products={products} /> */}
          <div className="h-screen w-full flex items-center justify-center ">
            <img src="/scroll.gif" />
          </div>
          <div className="hover:bg-neutral-50 cursor-pointer">
            <TextRevealByWord
              text={"Don't Go Down In Your Life, Uplift Yourself "}
            />

            <TrendingUp className="text-teal-300 w-12 h-12 text-center items-center -mt-[22rem] mx-auto hover:bg-teal-300 hover:rounded-lg" />
          </div>

          <footer className=" mt-[40vh] border-t-2 transition-all">
            <div className="relative mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 lg:pt-24">
              <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
                <a
                  className="inline-block rounded-full bg-gray-50 b-1 border-neutral-300 shadow-lg p-2 text-gray-60 transition hover:bg-neutral-100/10 sm:p-3 lg:p-4"
                  href="#hero"
                >
                  <span className="sr-only">Back to top</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              <div className="lg:flex lg:items-end lg:justify-between">
                <div>
                  <div className="flex justify-center text-teal-600 lg:justify-start">
                    <img src="/translogo.png" className="h-10" />
                  </div>
                </div>
              </div>

              <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
                Copyright &copy; 2024. All rights reserved.
              </p>
            </div>
          </footer>
        </>
      ) : (
        <img
          src="/loading.gif"
          className="w-1/3 mx-auto align-middle mt-[17rem] h-1/2"
        />
      )}
    </>
  );
};

export default page;
