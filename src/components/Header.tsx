'use client'

import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";

const navItems = [
  {
    id: 'nav-items-1',
    title: 'Projects',
    link: ''
  },
  {
    id: 'nav-items-2',
    title: 'Articles',
    link: '/articles'
  }
];

export function Header() {
  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);

  const mobileHeaderToggle = useCallback(() => {
    setIsMobileHeaderOpen(prev => !prev);
  }, []);

  return (
    <header className="sticky z-20 top-0 w-full bg-black bg-opacity-10 backdrop-blur-lg">
      <div className="mx-auto">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-x-2">
            <Image 
              alt="SSD" 
              src="/logo.png" 
              width={42} 
              height={42} 
              className="rounded-md" 
            />
            <p className="hidden md:block text-3xl font-bold">
              Sai Srikar Dumpeti
            </p>
          </Link>
          <nav className="hidden md:flex md:gap-x-8">
            {navItems.map(item => (
              <Link 
                href={item.link} 
                key={item.id}
                className="text-gray-100 hover:text-gray-600 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <button 
            onClick={mobileHeaderToggle}
            className="md:hidden focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileHeaderOpen ? <IconX size={26} /> : <IconMenu2 size={26} />}
          </button>
        </div>
      </div>
      {isMobileHeaderOpen && (
        <nav className="md:hidden">
          <ul className="flex flex-col items-center py-4">
            {navItems.map(item => (
              <li key={item.id} className="w-full">
                <Link 
                  href={item.link}
                  className="block py-2 px-4 text-center text-gray-100 hover:bg-gray-600 transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}