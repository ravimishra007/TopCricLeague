'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AgeVerification() {
  const router = useRouter();

  useEffect(() => {
    // Check if age is already verified
    const isAgeVerified = localStorage.getItem('isAgeVerified');
    if (isAgeVerified === 'true') {
      router.push('/');
    }
  }, [router]);

  const handleVerification = () => {
    // Set localStorage
    localStorage.setItem('isAgeVerified', 'true');
    
    // Set cookie
    document.cookie = 'isAgeVerified=true; path=/; max-age=31536000'; // 1 year expiry
    
    // Force a hard navigation to ensure middleware runs
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#1a1b1e] flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-md text-center">
        <h1 className="text-5xl font-bold mb-12">Are You 18+ ?</h1>
        <button
          onClick={handleVerification}
          className="bg-[#00ff00] text-black font-bold py-4 px-16 rounded-full text-xl hover:bg-[#00dd00] transition-colors"
        >
          YES
        </button>
      </div>
    </div>
  );
} 