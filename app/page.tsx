"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheck,
  FaStar,
  FaShieldAlt,
  FaRocket,
  FaChartLine,
  FaHeadset,
  FaGlobe,
  FaCheckCircle,
  FaWhatsapp,
  FaTelegram,
  FaGift,
  FaMobileAlt,
  FaClock,
  FaEnvelope,
  FaQuestion,
  FaTelegramPlane,
} from "react-icons/fa";
import { GiDiamonds, GiSpades, GiHearts, GiClubs } from "react-icons/gi";
import Snackbar from "../components/Snackbar";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "info";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showSnackbar = (
    type: "success" | "error" | "info",
    title: string,
    message: string
  ) => {
    setSnackbar({
      isOpen: true,
      type,
      title,
      message,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = async () => {
    if (!phone || phone.length !== 10) {
      showSnackbar(
        "error",
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number"
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessScreen(true);
        showSnackbar(
          "success",
          "Success",
          "Phone number saved successfully!"
        );
        setPhone("");
      } else {
        showSnackbar(
          "error",
          "Error",
          data.message || "Something went wrong"
        );
      }
    } catch (error) {
      showSnackbar(
        "error",
        "Error",
        "Failed to save phone number"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showSnackbar(
      "success",
      "Message Sent",
      "Your message has been sent successfully. We will get back to you soon."
    );
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Snackbar
        isOpen={snackbar.isOpen}
        onClose={closeSnackbar}
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
      />

      {/* Hero Section */}
      <section className="relative min-h-[100svh] mt-20 flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
        {/* Premium Background elements */}
        <div className="absolute inset-0 z-0">
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#1A1A2E] to-[#0A0A0F]"></div>
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-blue-800/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
          
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/50 via-transparent to-[#0A0A0F]/50 backdrop-blur-[1px]"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto relative z-20 px-4 sm:px-6 py-8 sm:py-12">
            <div className="text-white w-full">
              <div className="space-y-6 mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold animate-fade-in leading-tight">
                  Elevate Your{" "}
                  <span className="relative">
                    <span className="relative z-10 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">Fantasy</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 blur-sm"></div>
                  </span>{" "}
                  <span className="relative">
                    <span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">Cricket</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-800 blur-sm"></div>
                  </span>{" "}
                  Experience
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Join the elite community of cricket enthusiasts. Create your dream team, compete in premium matches, and win exclusive rewards.
                </p>
              </div>

              {/* Form Container */}
              <div className="w-full max-w-md mx-auto bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      }}
                      onFocus={() => setIsPhoneFocused(true)}
                      onBlur={() => setIsPhoneFocused(false)}
                      className="w-full px-6 py-4 bg-black/40 border-2 border-blue-500/20 focus:border-blue-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-lg tracking-wide"
                      placeholder="Enter your mobile number"
                      maxLength={10}
                    />
                    {isPhoneFocused && (
                      <div className="absolute -top-3 left-4 px-2 bg-[#0A0A0F] text-xs text-gray-400">
                        Mobile Number
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading || !phone || phone.length !== 10}
                    className={`w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:translate-y-[-2px] ${
                      phone.length === 10
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_10px_25px_rgba(59,130,246,0.4)]"
                        : "bg-black/40 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Submit <FaArrowRight className="text-xl" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center mt-4 p-3 bg-black/40 backdrop-blur-sm rounded-xl border border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <FaShieldAlt className="text-blue-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-gray-400 text-sm">
                          Your data is protected with bank-grade security.{" "}
                          <Link
                            href="/privacy-policy"
                            className="text-blue-400 hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Feature highlights */}
          {!showSuccessScreen && (
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slide-up" style={{ animationDelay: "0.9s" }}>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-5 py-2.5 rounded-full border border-blue-500/20">
              <Link href="/privacy-policy" className="flex items-center gap-2">
              <FaShieldAlt className="text-blue-400" />
                <span className="text-white text-sm">Privacy Policy</span>
              </Link>
                </div>
            
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-5 py-2.5 rounded-full border border-blue-500/20">
                <Link href="/terms" className="flex items-center gap-2">
                <FaRocket className="text-blue-400" />
                <span className="text-white text-sm">Terms & Conditions</span>
                </Link>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-5 py-2.5 rounded-full border border-blue-500/20">
              <Link href="#contact" className="flex items-center gap-2">
                <FaHeadset className="text-blue-400" />
                <span className="text-white text-sm">Contact Us</span>
              </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Our Story Section */}
      <section  id="about-us" className="py-20 px-4 bg-[#0A0A0F]">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Our{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">Journey</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 blur-sm"></div>
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The story of TopCricLeague - from a vision to a leading digital platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* The Beginning Card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-blue-800/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative bg-black/30 p-8 rounded-xl border border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    The Beginning
                  </h3>
                </div>
                <p className="text-gray-300 mb-6">
                  TopCricLeague was born in 2020 from a simple yet powerful idea: to
                  revolutionize how cricket fans engage with the sport they
                  love. Founded by a team of passionate cricket enthusiasts and
                  tech innovators, we set out to create a platform that would
                  bring the excitement of cricket to life in a whole new way.
                </p>
                <p className="text-gray-300">
                  Our journey began with a vision to combine cutting-edge
                  technology with the timeless appeal of cricket, creating a
                  digital experience that would transform how fans interact with
                  the game.
                </p>
              </div>
            </div>

            {/* Growth Timeline */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-800/10 to-blue-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative bg-black/30 p-8 rounded-xl border border-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-700 to-blue-900 flex items-center justify-center text-white text-2xl font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Growth</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shrink-0">
                      2020
                    </div>
                    <div>
                      <h4 className="text-white font-bold">The Launch</h4>
                      <p className="text-gray-300">
                        Founded with a vision to transform cricket engagement
                        and create a revolutionary platform for fans.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shrink-0">
                      2021
                    </div>
                    <div>
                      <h4 className="text-white font-bold">First Milestone</h4>
                      <p className="text-gray-300">
                        Reached 100,000 active users and introduced innovative
                        features that set new industry standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shrink-0">
                      2022
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Global Expansion</h4>
                      <p className="text-gray-300">
                        Expanded to international markets and launched our
                        mobile app, bringing the platform to fans worldwide.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shrink-0">
                      2023
                    </div>
                    <div>
                      <h4 className="text-white font-bold">
                        Major Achievement
                      </h4>
                      <p className="text-gray-300">
                        Surpassed 1 million users and implemented advanced
                        security features to protect our community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-black/30 p-8 rounded-xl border border-blue-500/20 max-w-3xl mx-auto relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-blue-800/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Our Mission
                </h3>
                <p className="text-gray-300 mb-6">
                  At TopCricLeague, we're committed to creating a platform that
                  brings cricket enthusiasts together, providing them with
                  innovative tools to enhance their experience and earn rewards.
                  We believe in transparency, security, and delivering
                  exceptional value to our users.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-blue-400" />
                    <span className="text-gray-300">Secure Platform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRocket className="text-blue-400" />
                    <span className="text-gray-300">Fast Transactions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaHeadset className="text-blue-400" />
                    <span className="text-gray-300">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Us Link */}
            <div className="mt-12 text-center animate-fade-in">
              <button
                onClick={() => scrollToSection(contactRef)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 border border-blue-500/30"
              >
                Get in Touch with Us
                <FaArrowRight className="text-xl" />
              </button>
              <p className="mt-4 text-gray-400">
                Have questions? We'd love to hear from you!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        id="features"
        className="py-20 px-4 bg-[#0A0A0F] relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Why Choose <span className="text-gradient">TopCricLeague</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience the future of fantasy cricket with our cutting-edge
              features and premium services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaRocket className="text-4xl text-blue-400" />,
                title: "Lightning Fast Experience",
                description:
                  "Enjoy seamless gameplay with our high-performance platform. Quick loading times and instant updates keep you in the game.",
                features: [
                  "Instant match updates",
                  "Quick team creation",
                  "Real-time scoring",
                ],
              },
              {
                icon: <FaShieldAlt className="text-4xl text-blue-400" />,
                title: "Bank-Grade Security",
                description:
                  "Your data and transactions are protected with enterprise-level security measures and encryption protocols.",
                features: [
                  "SSL encryption",
                  "Two-factor authentication",
                  "Secure payments",
                ],
              },
              {
                icon: <FaChartLine className="text-4xl text-blue-400" />,
                title: "Advanced Analytics",
                description:
                  "Make informed decisions with our comprehensive player statistics and match analysis tools.",
                features: [
                  "Player performance metrics",
                  "Match predictions",
                  "Historical data",
                ],
              },
              {
                icon: <FaHeadset className="text-4xl text-blue-400" />,
                title: "24/7 Premium Support",
                description:
                  "Our dedicated support team is always ready to assist you with any queries or concerns.",
                features: [
                  "Instant chat support",
                  "Email assistance",
                  "FAQ database",
                ],
              },
              {
                icon: <FaGift className="text-4xl text-blue-400" />,
                title: "Exclusive Rewards",
                description:
                  "Enjoy special bonuses, cash prizes, and exclusive rewards for your achievements.",
                features: [
                  "Daily bonuses",
                  "Special tournaments",
                  "Loyalty rewards",
                ],
              },
              {
                icon: <FaMobileAlt className="text-4xl text-blue-400" />,
                title: "Mobile-First Design",
                description:
                  "Play on the go with our responsive mobile interface designed for optimal gaming experience.",
                features: [
                  "Responsive design",
                  "App-like experience",
                  "Easy navigation",
                ],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-black/30 p-8 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-blue-800/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <FaCheck className="text-blue-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/30 p-6 rounded-xl border border-blue-500/20 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">1M+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="bg-black/30 p-6 rounded-xl border border-blue-500/20 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
            <div className="bg-black/30 p-6 rounded-xl border border-blue-500/20 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section
        ref={pricingRef}
        id="pricing"
        className="py-20 px-4 bg-secondary-light"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Simple <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the plan that's right for you. All plans include our core
              features with no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$49",
                features: [
                  "Core Features",
                  "5GB Storage",
                  "10 Users",
                  "Basic Support",
                  "Monthly Reports",
                ],
              },
              {
                name: "Professional",
                price: "$99",
                features: [
                  "All Starter Features",
                  "50GB Storage",
                  "Unlimited Users",
                  "Priority Support",
                  "Advanced Analytics",
                  "API Access",
                ],
              },
              {
                name: "Enterprise",
                price: "$199",
                features: [
                  "All Professional Features",
                  "Unlimited Storage",
                  "Custom Integrations",
                  "Dedicated Support",
                  "Custom Solutions",
                  "SLA Guarantee",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-secondary p-6 rounded-xl border ${
                  index === 1
                    ? "border-primary shadow-glow"
                    : "border-primary/20"
                } hover-glow animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold mb-2 text-white">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-gray-300">/month</span>
                </div>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <FaCheck className="text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-4 rounded-full font-medium text-white transition-colors ${
                    index === 1
                      ? "bg-primary hover:bg-primary-dark"
                      : "bg-secondary-light hover:bg-primary/20"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        className="py-20 px-4 bg-[#0A0A0F] relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Get in <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Have questions or need assistance? Our team is here to help you
              24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-black/30 p-8 rounded-xl border border-blue-500/20 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-blue-800/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Send us a Message
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-300 text-sm mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-black/40 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-300 text-sm mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-black/40 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-300 text-sm mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 bg-black/40 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-300 text-sm mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-black/40 border border-blue-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 border border-blue-500/30"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Support Hours */}
              <div className="bg-black/30 p-6 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <FaClock className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Support Hours
                    </h3>
                    <p className="text-gray-300">24/7 Customer Support</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaCheck className="text-blue-400" />
                    <span>Monday - Sunday: 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaCheck className="text-blue-400" />
                    <span>Instant Response Time</span>
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              <div className="bg-black/30 p-6 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <FaWhatsapp className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Contact Methods
                    </h3>
                    <p className="text-gray-300">
                      Choose your preferred way to reach us
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <FaWhatsapp className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">WhatsApp</h4>
                      <p className="text-gray-300">+1 (304) 494-1901</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <FaTelegram className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Telegram</h4>
                      <p className="text-gray-300">@TopCricLeagueSupport</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <FaEnvelope className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email</h4>
                      <p className="text-gray-300">support@TopCricLeague.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-black/30 p-6 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <FaQuestion className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Frequently Asked Questions
                    </h3>
                    <p className="text-gray-300">
                      Find quick answers to common questions
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => scrollToSection(faqRef)}
                  className="mt-4 w-full bg-black/40 hover:bg-blue-500/10 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-blue-500/20"
                >
                  Visit FAQ Section
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
