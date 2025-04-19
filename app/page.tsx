"use client";

import React, { useState, useEffect, useRef } from "react";
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
} from "react-icons/fa";
import { GiDiamonds, GiSpades, GiHearts, GiClubs } from "react-icons/gi";
import Snackbar from "../components/Snackbar";
import { sendVerificationEmail } from "./utils/sendVerificationEmail";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "info";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "info" as "success" | "error" | "info",
    title: "",
    message: "",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  // const testimonialsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetPageState = () => {
    setPhone("");
    setFormattedPhone("");
    setOtp("");
    setIsOtpSent(false);
    setError("");
    setLoading(false);
  };

  const closeSnackbar = () => {
    // Only reset if it was a successful verification
    if (
      snackbar.type === "success" &&
      snackbar.message.includes("Verification successful")
    ) {
      resetPageState();
    }
    setSnackbar((prev) => ({ ...prev, isOpen: false }));
  };

  const handleRedirect = () => {
    // Only reset if it was a successful verification
    if (
      snackbar.type === "success" &&
      snackbar.message.includes("Verification successful")
    ) {
      resetPageState();
    }
    window.location.href = "/";
  };

  const showSnackbar = (
    type: "success" | "error" | "info",
    title: string,
    message: string,
    shouldRedirect = false
  ) => {
    setSnackbar({
      isOpen: true,
      type,
      title,
      message,
    });

    if (shouldRedirect) {
      // Add a delay before redirect to show the snackbar
      setTimeout(handleRedirect, 2000);
    }
  };

  const handleErrorResponse = (data: any) => {
    switch (data.errorType) {
      case "ALREADY_VERIFIED":
        // Send verification email for already verified numbers too
        try {
          sendVerificationEmail(formattedPhone);
        } catch (emailError) {
          console.error("Failed to send verification email:", emailError);
        }
        showSnackbar(
          "success",
          "Already Verified",
          "Verification successful. Redirecting...",
          true
        );
        break;
      case "INVALID_OTP":
        showSnackbar(
          "error",
          "Invalid OTP",
          "Please check the OTP and try again."
        );
        setOtp(""); // Clear the OTP input
        break;
      case "VERIFICATION_FAILED":
        showSnackbar(
          "error",
          "Verification Failed",
          "Could not verify the OTP. Please try again or request a new one."
        );
        setOtp(""); // Clear the OTP input
        break;
      case "RESEND_FAILED":
        showSnackbar(
          "error",
          "Resend Failed",
          "Could not resend OTP. Please try again in a few minutes."
        );
        break;
      default:
        showSnackbar(
          "error",
          "Error",
          data.message || "Something went wrong. Please try again."
        );
    }
  };

  // Function to handle automatic OTP reading
  const startOtpListener = async () => {
    if (!("OTPCredential" in window)) {
      console.log("Web OTP API not supported");
      return;
    }

    try {
      const abortController = new AbortController();

      // Add an abort timeout of 2 minutes
      setTimeout(() => {
        abortController.abort();
      }, 120000);

      // @ts-ignore - Web OTP API experimental feature
      const credential = await navigator.credentials.get({
        // @ts-ignore - Web OTP API experimental feature
        otp: { transport: ["sms"] },
        signal: abortController.signal,
      });

      // @ts-ignore - Web OTP API experimental feature
      if (credential?.code) {
        // @ts-ignore - Web OTP API experimental feature
        const otpCode = credential.code;
        if (otpCode && typeof otpCode === "string" && otpCode.length === 4) {
          setOtp(otpCode);
          showSnackbar(
            "success",
            "OTP Detected",
            "OTP has been automatically filled"
          );
          // Automatically verify after a short delay
          setTimeout(() => {
            handleVerifyOtp();
          }, 500);
        }
      }
    } catch (err: any) {
      if (err?.name === "AbortError") {
        console.log("OTP reading timed out");
        showSnackbar("info", "OTP Timeout", "Please enter the OTP manually");
      } else {
        console.log("OTP Reading failed:", err);
      }
    }
  };

  // Start OTP listener when OTP is sent
  useEffect(() => {
    if (isOtpSent) {
      startOtpListener();
    }
  }, [isOtpSent]);

  const handleSendOtp = async () => {
    if (!phone) {
      showSnackbar(
        "error",
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number"
      );
      return;
    }

    const formattedNumber = `+91${phone}`;
    setFormattedPhone(formattedNumber);
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formattedNumber,
          action: "send",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsOtpSent(true);
        showSnackbar(
          "success",
          "OTP Sent!",
          "Please wait while we try to auto-fill the OTP"
        );
      } else {
        handleErrorResponse(data);
      }
    } catch (err) {
      showSnackbar("error", "Error", "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleSocialClick = (platform: "whatsapp" | "telegram") => {
  //   if (platform === "whatsapp") {
  //     const whatsappNumber = "+13044941901";
  //     const message = "Hi, I'm interested in SpinKings!";
  //     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  //       message
  //     )}`;
  //     window.open(whatsappUrl, "_blank");
  //   } else {
  //     const telegramUrl = "https://t.me/your_telegram_channel";
  //     window.open(telegramUrl, "_blank");
  //   }
  // };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      showSnackbar("error", "Invalid OTP", "Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formattedPhone,
          otp,
          action: "verify",
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userPhone", formattedPhone);
        setShowSuccessScreen(true);
      } else {
        handleErrorResponse(data);
      }
    } catch (err) {
      showSnackbar("error", "Error", "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formattedPhone,
          action: "resend",
        }),
      });

      const data = await response.json();

      if (data.success) {
        showSnackbar(
          "success",
          "OTP Resent!",
          "Please check your phone for the new OTP code"
        );
      } else {
        handleErrorResponse(data);
      }
    } catch (err) {
      showSnackbar("error", "Error", "Failed to resend OTP. Please try again.");
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
      <section
        ref={heroRef}
        className="relative min-h-[100svh] mt-10 sm:mt-10 flex items-center justify-center overflow-hidden bg-[#1E1B4B]"

      >
        {/* Premium Background elements */}
        <div className="absolute inset-0 z-0">
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#1E1B4B]"></div>
          
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-blue-600/30 to-violet-600/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
          
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E1B4B]/50 via-transparent to-[#1E1B4B]/50 backdrop-blur-[1px]"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto relative z-20 px-4 sm:px-6 py-8 sm:py-12">
          {!showSuccessScreen ? (
            <div className="text-white w-full">
              <div className="space-y-6 mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl  font-bold animate-fade-in leading-tight">
                  Elevate Your{" "}
                  <span className="relative">
                    <span className="relative z-10 bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">Fantasy</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 blur-sm"></div>
                  </span>{" "}
                  <span className="relative">
                    <span className="relative z-10 bg-gradient-to-r from-fuchsia-400 to-blue-400 text-transparent bg-clip-text">Cricket</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-400 to-blue-400 blur-sm"></div>
                  </span>{" "}
                  Experience
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Join the elite community of cricket enthusiasts. Create your dream team, compete in premium matches, and win exclusive rewards.
                </p>
              </div>

              {/* Form Container */}
              <div className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
                {!isOtpSent ? (
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
                        className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 focus:border-violet-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-lg tracking-wide"
                        placeholder="Enter your mobile number"
                        maxLength={10}
                      />
                      {isPhoneFocused && (
                        <div className="absolute -top-3 left-4 px-2 bg-[#1E1B4B] text-xs text-gray-400">
                          Mobile Number
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleSendOtp}
                      disabled={loading || !phone || phone.length !== 10}
                      className={`w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:translate-y-[-2px] ${
                        phone.length === 10
                          ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white shadow-[0_8px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_10px_25px_rgba(139,92,246,0.4)]"
                          : "bg-white/5 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Get Started <FaArrowRight className="text-xl" />
                        </>
                      )}
                    </button>

                    {/* <div className="flex items-center justify-center mt-4 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                      <div className="flex items-center gap-3"> */}
                        {/* <div className="bg-violet-500/10 p-2 rounded-lg">
                          <FaShieldAlt className="text-violet-400" />
                        </div> */}
                        {/* <div className="text-left">
                          <p className="text-gray-400 text-sm">
                            Your data is protected with bank-grade security.{" "}
                            <Link
                              href="/privacy-policy"
                              className="text-violet-400 hover:text-violet-300 transition-colors underline-offset-4 hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </p>
                        </div> */}
                      </div>
                  //   </div>
                  // </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="w-full px-6 py-4 bg-secondary/30 border-2 border-primary/20 focus:border-primary/50 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-center text-2xl tracking-[1em] font-medium"
                        placeholder="••••"
                        maxLength={4}
                      />
                    </div>

                    <button
                      onClick={handleVerifyOtp}
                      disabled={loading || otp.length !== 4}
                      className={`w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:translate-y-[-2px] ${
                        otp.length === 4
                          ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white shadow-[0_8px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_10px_25px_rgba(139,92,246,0.4)]"
                          : "bg-secondary text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Verify OTP <FaCheck className="text-xl" />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        onClick={handleResendOtp}
                        disabled={loading || resendTimer > 0}
                        className="text-gray-400 hover:text-primary text-sm transition-all duration-300 hover:scale-105"
                      >
                        {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-secondary-light/50 backdrop-blur-xl p-8 rounded-2xl border border-primary/20 shadow-[0_0_40px_rgba(139,92,246,0.15)] animate-fade-in max-w-md w-full relative">
              <button 
                onClick={() => {
                  setShowSuccessScreen(false);
                  window.location.reload();
                }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <FaCheckCircle className="text-primary text-4xl" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Welcome to SpinKings!
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Our team will contact you shortly to complete your registration and guide you through the process.
                </p>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-gray-300 text-sm">
                      Please keep your phone nearby. Our representative will reach out to you within the next 24 hours.
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-8">
                  Thank you for choosing SpinKings!
                </p>
              </div>
            </div>
          )}

          {/* Feature highlights */}
          {!showSuccessScreen && (
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slide-up" style={{ animationDelay: "0.9s" }}>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10">
              <Link href="/privacy-policy" className="flex items-center gap-2">
                <FaShieldAlt className="text-violet-400" />
                  <span className="text-white text-sm">Privacy Policy</span>
              </Link>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10">
              <Link href="/terms" className="flex items-center gap-2">
                <FaRocket className="text-fuchsia-400" />
                <span className="text-white text-sm">Terms and Conditions</span>
              </Link>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10">
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
      <section ref={storyRef} id="about-us" className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Our Journey
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The story of SpinKings - from a vision to a leading digital
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* The Beginning Card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative bg-secondary-light p-8 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white text-2xl font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    The Beginning
                  </h3>
                </div>
                <p className="text-gray-300 mb-6">
                  SpinKings was born in 2020 from a simple yet powerful idea: to
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
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative bg-secondary-light p-8 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-accent-dark flex items-center justify-center text-white text-2xl font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Growth</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white font-bold shrink-0">
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white font-bold shrink-0">
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white font-bold shrink-0">
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
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white font-bold shrink-0">
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
            <div className="inline-block bg-secondary-light p-8 rounded-xl border border-primary/20 max-w-3xl mx-auto relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Our Mission
                </h3>
                <p className="text-gray-300 mb-6">
                  At SpinKings, we're committed to creating a platform that
                  brings cricket enthusiasts together, providing them with
                  innovative tools to enhance their experience and earn rewards.
                  We believe in transparency, security, and delivering
                  exceptional value to our users.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-primary" />
                    <span className="text-gray-300">Secure Platform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRocket className="text-primary" />
                    <span className="text-gray-300">Fast Transactions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaHeadset className="text-primary" />
                    <span className="text-gray-300">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Us Link */}
            <div className="mt-12 text-center animate-fade-in">
              <button
                onClick={() => scrollToSection(contactRef)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/50 border border-primary/30"
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
        className="py-20 px-4 bg-secondary-light relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Why Choose <span className="text-gradient">SpinKings</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience the future of fantasy cricket with our cutting-edge
              features and premium services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaRocket className="text-4xl text-primary" />,
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
                icon: <FaShieldAlt className="text-4xl text-primary" />,
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
                icon: <FaChartLine className="text-4xl text-primary" />,
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
                icon: <FaHeadset className="text-4xl text-primary" />,
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
                icon: <FaGift className="text-4xl text-primary" />,
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
                icon: <FaMobileAlt className="text-4xl text-primary" />,
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
                className="group relative bg-secondary p-8 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <FaCheck className="text-primary" />
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
            <div className="bg-secondary p-6 rounded-xl border border-primary/20 text-center">
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="bg-secondary p-6 rounded-xl border border-primary/20 text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
            <div className="bg-secondary p-6 rounded-xl border border-primary/20 text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-gray-300">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
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
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        className="py-20 px-4 bg-secondary relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
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
            <div className="bg-secondary-light p-8 rounded-xl border border-primary/20 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
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
                        className="w-full px-4 py-3 bg-secondary border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
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
                        className="w-full px-4 py-3 bg-secondary border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
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
                      className="w-full px-4 py-3 bg-secondary border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
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
                      className="w-full px-4 py-3 bg-secondary border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/50 border border-primary/30"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Support Hours */}
              <div className="bg-secondary-light p-6 rounded-xl border border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaClock className="text-primary text-xl" />
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
                    <FaCheck className="text-primary" />
                    <span>Monday - Sunday: 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaCheck className="text-primary" />
                    <span>Instant Response Time</span>
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              <div className="bg-secondary-light p-6 rounded-xl border border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaWhatsapp className="text-primary" />
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
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaWhatsapp className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">WhatsApp</h4>
                      <p className="text-gray-300">+1 (304) 494-1901</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaTelegram className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Telegram</h4>
                      <p className="text-gray-300">@SpinKingsSupport</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaEnvelope className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email</h4>
                      <p className="text-gray-300">support@SpinKings.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-secondary-light p-6 rounded-xl border border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FaQuestion className="text-primary text-xl" />
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
                  className="mt-4 w-full bg-secondary hover:bg-primary/10 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-primary/20"
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
