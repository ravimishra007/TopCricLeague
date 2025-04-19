'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { companyTimeline, companyValues, teamMembers } from '../../constants/constants';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen bg-secondary">

      {/* Hero Section */}
      <section className=" mt-40 sm:min-h-screen  sm:mt-0 flex flex-col justify-center items-center relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-secondary/50"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,0,0,0.1)_0%,transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">About </span>
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-transparent bg-clip-text">TopPlaying</span>
              <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-yellow-400 text-transparent bg-clip-text">11</span>
            </h1>
            <p className="text-gray-300 text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed">
              Discover the story behind India's leading digital cricket platform and our mission to revolutionize the way fans engage with the sport.
            </p>
          </div>
        </div>
      </section>

      {/* Scroll Down Indicator */}
      <div className="hidden sm:flex relative z-20 justify-center -mt-24 mb-24">
        <div
          onClick={() => {
            const storySection = document.querySelector('#our-story');
            storySection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center animate-bounce cursor-pointer hover:bg-yellow-500/30 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Our Story Section */}
      <section id="our-story" className="py-20 sm:py-32 px-4 bg-gradient-to-b from-black to-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Our </span>
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-transparent bg-clip-text">Story</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-red-600 to-yellow-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-slide-left">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600/10 to-yellow-500/10 rounded-xl blur-lg"></div>
              <div className="relative bg-black/50 p-8 rounded-xl border border-red-500/20 backdrop-blur-sm">
                <h3 className="text-3xl font-bold mb-8 text-white">The Beginning</h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  SpinKings  was founded in 2020 by a team of passionate cricket enthusiasts and technology innovators.
                  We recognized a gap in the market for a platform that could bring the excitement of cricket to fans in a
                  more interactive and rewarding way.
                </p>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  What started as a simple idea quickly evolved into a comprehensive platform that combines cutting-edge
                  technology with the timeless appeal of cricket. Our mission was clear: to create a digital experience
                  that would revolutionize how fans engage with the sport they love.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-800 border-2 border-black flex items-center justify-center text-white text-xl font-bold ring-2 ring-red-500/20">
                        {i}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm">Our founding team</p>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-right">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600/10 to-yellow-500/10 rounded-xl blur-lg"></div>
              <div className="relative bg-black/50 p-8 rounded-xl border border-red-500/20 backdrop-blur-sm">
                <h3 className="text-3xl font-bold mb-8 text-white">Our Growth</h3>
                <div className="space-y-8">
                  {companyTimeline.map((item, index) => (
                    <div key={index} className="flex gap-6 items-start group">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600/20 to-yellow-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <item.icon className=" text-xl sm:text-2xl" />
                      </div>
                      <div>
                        <h4 className="text-white text-xl font-bold mb-2">{item.year}</h4>
                        <p className="text-gray-300 text-lg">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="bg-black/50 p-5 sm:p-12 rounded-xl border border-red-500/20 backdrop-blur-sm max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-center text-white">Our Mission</h3>
              <p className="text-gray-300 text-lg sm:text-xl text-center leading-relaxed">
                At SpinKings , we're committed to creating a platform that brings cricket enthusiasts together,
                providing them with innovative tools to enhance their experience and earn rewards. We believe in
                transparency, security, and delivering exceptional value to our users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-10  px-4 bg-gradient-to-b from-secondary to-black">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Our </span>
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-transparent bg-clip-text">Values</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-red-600 to-yellow-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-black/50 p-8 rounded-xl border border-red-500/20 backdrop-blur-sm h-full transform group-hover:scale-[1.02] transition-transform">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-600/20 to-yellow-500/20 flex items-center justify-center text-red-500 mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <value.icon className="text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white text-center">{value.title}</h3>
                  <p className="text-gray-300 text-lg text-center leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className=" sm:py-32  px-4 bg-gradient-to-b from-black to-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Our </span>
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-transparent bg-clip-text">Team</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-red-600 to-yellow-500 mx-auto mb-8"></div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Meet the passionate individuals behind SpinKings who are dedicated to revolutionizing cricket engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-black/50 p-8 rounded-xl border border-red-500/20 backdrop-blur-sm text-center transform group-hover:scale-[1.02] transition-transform">
                  <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-red-500/20 group-hover:ring-red-500/40 transition-all">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{member.name}</h3>
                  <p className="text-red-500 text-lg mb-6">{member.role}</p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Passionate about cricket and technology, dedicated to creating the best digital experience for fans.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className=" py-20  px-4 bg-gradient-to-b from-secondary to-black relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,0,0,0.1)_0%,transparent_50%)]"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="bg-black/50 p-5 sm:p-16 rounded-2xl border border-red-500/20 backdrop-blur-sm text-center max-w-5xl mx-auto transform hover:scale-[1.01] transition-transform">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
              <span className="text-white">Join the </span>
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-transparent bg-clip-text">SpinKings</span>
              <span className="text-white"> Community</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience the future of cricket engagement and start earning rewards today. Join thousands of satisfied users who have transformed their cricket experience with SpinKings.
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-full text-base sm:text-lg md:text-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-600/50 border border-yellow-500/30 group w-full sm:w-auto text-center justify-center"
            >
              Get Started Now
              <FaArrowLeft className="ml-2 sm:ml-3 transform rotate-180 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 