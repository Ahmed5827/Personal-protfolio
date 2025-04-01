'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon, XIcon } from 'lucide-react'
import { cn } from '../lib/utils'

interface NavLinkType {
  name: string
  path: string
}

const navLinks: NavLinkType[] = [
  {
    name: 'About Me',
    path: '/AboutMe',
  },
  {
    name: 'Skills',
    path: '/Skills',
  },
  {
    name: 'Projects',
    path: '/projects',
  },
  {
    name: 'Certifications',
    path: '/certifications',
  },
  {
    name: 'Extra curicular activities',
    path: '/extra-curicular-activities',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
]

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header className='fixed w-full px-8 bg-zinc-900 z-50 shadow-sm shadow-neutral-500 h-16 flex items-center'>
        <nav className='flex justify-between items-center w-full'>
          <Link href='/' className='font-bold'>
            Ahmed Chebbi
          </Link>
          
          {/* Desktop Navigation - hidden on mobile */}
          <ul className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={pathname === link.path ? 'text-gray-400' : 'text-white'}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <a   
              href="/Ahmed Chebbi.pdf"
              download
              className='rounded-lg py-2 px-4 bg-[#1FABEB]'
            >
              Download Resume
            </a>
          </ul>

          {/* Mobile Menu Button - hidden on desktop */}
          <button
  aria-label='Menu Toggle Button'
  className='block md:hidden relative w-6 h-6 focus:outline-none'
  onClick={toggleMenu}
>
  <div className='relative w-full h-full'>
    {/* Hamburger Icon */}
    <MenuIcon className={cn(
      'absolute size-6 text-secondary transition-all duration-300',
      isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
    )} />
    
    {/* Close Icon */}
    <XIcon className={cn(
      'absolute size-6 text-secondary transition-all duration-300',
      isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
    )} />
  </div>
</button>
        </nav>
      </header>

      {/* Mobile Menu - hidden on desktop */}
      <div className={cn(
        'fixed top-16 left-0 right-0 bg-neutral-700 z-40 transform transition-all duration-300 ease-in-out overflow-y-auto md:hidden',
        isMenuOpen ? 'h-[calc(100vh-4rem)]' : 'h-0'
      )}>
        <div className='flex flex-col items-center pt-8 px-4'>
          <ul className='space-y-6 w-full max-w-md text-center'>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={cn(
                    'text-lg block',
                    pathname === link.path ? 'text-gray-400' : 'text-secondary'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className='pt-4'>
              <a   
                href="/Ahmed Chebbi.pdf"
                download
                className='rounded-lg py-2 px-6 bg-[#1FABEB] inline-block'
              >
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}