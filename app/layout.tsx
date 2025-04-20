import React from 'react';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'TopCricLeague - Ultimate Fantasy Cricket Experience',
  description: 'Experience the thrill of fantasy cricket with TopCricLeague - where every match is a chance to become royalty',
  keywords: 'fantasy cricket, TopCricLeague, cricket game, fantasy sports, cricket betting, cricket league',
  authors: [{ name: 'TopCricLeague Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#8B5CF6',
  creator: "CricFusion",
  icons: {
    icon: [
      { url: "/TopCricLeague.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
} 