'use client';

import { IconMenu2, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

const navItems = [
  {
    id: 'nav-items-1',
    title: 'Projects',
    link: '',
  },
  {
    id: 'nav-items-2',
    title: 'Articles',
    link: '/articles',
  },
];

export function Header() {
  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);

  const mobileHeaderToggle = useCallback(() => {
    setIsMobileHeaderOpen((prev) => !prev);
  }, []);

  return (
    <header className="sticky top-0 z-20 w-full bg-black bg-opacity-10 backdrop-blur-lg">
      <div className="mx-auto">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-x-2">
            <Image
              alt="SSD"
              src="/logo.png"
              width={42}
              height={42}
              className="rounded-md"
            />
            <p className="hidden text-3xl font-bold md:block">
              Sai Srikar Dumpeti
            </p>
          </Link>
          <nav className="hidden md:flex md:gap-x-8">
            {navItems.map((item) => (
              <Link
                href={item.link}
                key={item.id}
                className="text-gray-100 transition-colors hover:text-gray-600"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <button
            onClick={mobileHeaderToggle}
            className="focus:outline-none md:hidden"
            aria-label="Toggle mobile menu"
          >
            {isMobileHeaderOpen ? <IconX size={26} /> : <IconMenu2 size={26} />}
          </button>
        </div>
      </div>
      {isMobileHeaderOpen && (
        <nav className="md:hidden">
          <ul className="flex flex-col items-center py-4">
            {navItems.map((item) => (
              <li key={item.id} className="w-full">
                <Link
                  href={item.link}
                  className="block px-4 py-2 text-center text-gray-100 transition-colors hover:bg-gray-600"
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
