"use client";
import Link from "next/link";
import { FaArrowLeft, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  // Handle hash links on initial page load
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const hash = window.location.hash;
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname]);

  const handleHashLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    e.preventDefault();

    // If we're already on the home page, just scroll to the element
    if (pathname === "/") {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Element with id "${hash.replace("#", "")}" not found`);
      }
    } else {
      // If we're on another page, navigate to home page with hash
      router.push(`/${hash}`);
    }
  };

  const socialIcons = [
    { icon: <FaFacebookF />, name: 'facebook' },
    { icon: <FaTwitter />, name: 'twitter' },
    { icon: <FaInstagram />, name: 'instagram' },
    { icon: <FaLinkedinIn />, name: 'linkedin' }
  ];

  return (
    <footer className="py-12 px-4 bg-secondary-dark">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text">
                Spin
              </span>
              <span className="text-white">Kings</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Experience the thrill of fantasy cricket with our cutting-edge platform.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Features', 'Game Guide', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : link === 'About' ? '#about-us' : `/#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              {['Blog', 'Documentation', 'Support'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-300 hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-lg font-bold mb-4 text-white">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and news.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Your email"
                className="bg-secondary border border-blue-600 rounded-lg sm:rounded-r-none px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary w-full"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:bg-primary-dark text-white px-6 py-2 rounded-lg sm:rounded-l-none transition-colors flex items-center justify-center"
              >
                <span className="mr-2 text-sm sm:hidden">Subscribe</span>
                <FaArrowLeft className="transform rotate-180" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8 mt-8">
          <div>
            <div className="text-xl font-bold text-blue-500 mb-4">18+ Only</div>
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold mb-4 text-white">Important Notice</h3>
              <p className="text-sm text-gray-400">
                This platform is designed for entertainment purposes. Participate responsibly and be aware of your limits.
                Success in previous games doesn't guarantee future outcomes.
              </p>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-300">
            <p>&copy; {new Date().getFullYear()} SpinKings. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
