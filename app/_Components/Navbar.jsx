import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'

function Nav() {
  return (
    <>
      <header className="bg-neutral-100 dark:bg-neutral-900 transition-colors">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <a className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <Image
                  className="rounded-lg"
                  src="/translogo.png"
                  alt="LeRN"
                  height={150}
                  width={150}
                />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserButton />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Nav
