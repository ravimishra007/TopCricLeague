'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle hash links on initial page load
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash;
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();

    // If we're already on the home page, just scroll to the element
    if (pathname === '/') {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Element with id "${hash.replace('#', '')}" not found`);
      }
    } else {
      // If we're on another page, navigate to home page with hash
      router.push(`/${hash}`);
    }

    // Close mobile menu after clicking a link
    setMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    if (pathname === '/') {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#contact');
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white font-montserrat">
            <span className="bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text">
              Spin
            </span>
            <span className="text-white">Kings</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <Link href="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link> */}
            <Link href="#about-us" className="text-gray-300 hover:text-blue-500 transition-colors">About Us</Link>
            <Link href="/faq" className="text-gray-300 hover:text-blue-500 transition-colors">FAQ</Link>
            <a href="#features" onClick={(e) => handleHashLink(e, '#features')} className="text-gray-300 hover:text-blue-500 transition-colors">Features</a>
            {/* <a href="#game-guide" onClick={(e) => handleHashLink(e, '#game-guide')} className="text-gray-300 hover:text-primary transition-colors">Game Guide</a> */}
            {/* <a href="#pricing" onClick={(e) => handleHashLink(e, '#pricing')} className="text-gray-300 hover:text-primary transition-colors">Pricing</a> */}
            <button 
              onClick={handleContactClick}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800  shadow-[0_8px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_10px_25px_rgba(139,92,246,0.4)] hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} mt-4`}>
          <div className="px-4 pt-2 pb-4 space-y-3">
            {/* <Link href="/" className="block text-gray-300 hover:text-primary transition-colors py-2">Home</Link> */}
            <Link href="#about-us" className="block text-gray-300 hover:text-primary transition-colors py-2">About</Link>
            <Link href="/faq" className="block text-gray-300 hover:text-blue-500 transition-colors py-2">FAQ</Link>
            <a href="#features" onClick={(e) => handleHashLink(e, '#features')} className="block text-gray-300 hover:text-blue-500 transition-colors py-2">Features</a>
            {/* <a href="#game-guide" onClick={(e) => handleHashLink(e, '#game-guide')} className="block text-gray-300 hover:text-primary transition-colors py-2">Game Guide</a> */}
            {/* <a href="#pricing" onClick={(e) => handleHashLink(e, '#pricing')} className="text-gray-300 hover:text-primary transition-colors">Pricing</a> */}
            <a href="#contact" onClick={(e) => handleHashLink(e, '#contact')} className="block text-gray-300 hover:text-blue-500 transition-colors py-2">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}