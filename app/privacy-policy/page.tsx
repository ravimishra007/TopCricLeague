"use client";

import React, { useState } from "react";
import { FaShieldAlt, FaUser, FaLock, FaCookie, FaGlobe, FaQuestion } from "react-icons/fa";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: <FaShieldAlt /> },
    { id: "data-collection", title: "Data Collection", icon: <FaUser /> },
    { id: "data-protection", title: "Data Protection", icon: <FaLock /> },
    { id: "cookies", title: "Cookies", icon: <FaCookie /> },
    { id: "international", title: "International Data", icon: <FaGlobe /> },
    { id: "rights", title: "Your Rights", icon: <FaQuestion /> },
  ];

  return (
    <main className="min-h-screen mt-10  bg-secondary py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-secondary-light rounded-xl border border-primary/20 p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6 text-white">Sections</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? "bg-primary text-white"
                        : "text-gray-300 hover:bg-primary/10"
                    }`}
                  >
                    {section.icon}
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-secondary-light rounded-xl border border-primary/20 p-8">
              {/* Overview */}
              {activeSection === "overview" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Overview</h2>
                  <p className="text-gray-300">
                    At SpinKings, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                  </p>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Key Points</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaShieldAlt className="text-primary mt-1" />
                        <span>We collect only necessary information to provide our services</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaLock className="text-primary mt-1" />
                        <span>Your data is protected with industry-standard security measures</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaUser className="text-primary mt-1" />
                        <span>You have control over your personal information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Data Collection */}
              {activeSection === "data-collection" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Data Collection</h2>
                  <p className="text-gray-300">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="space-y-3 list-disc list-inside text-gray-300">
                    <li>Personal identification information (name, email, phone number)</li>
                    <li>Account credentials</li>
                    <li>Payment information</li>
                    <li>Communication preferences</li>
                    <li>Usage data and analytics</li>
                  </ul>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">How We Use Your Data</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaUser className="text-primary mt-1" />
                        <span>To provide and maintain our services</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaShieldAlt className="text-primary mt-1" />
                        <span>To protect against fraud and unauthorized access</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaGlobe className="text-primary mt-1" />
                        <span>To improve user experience and platform functionality</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Data Protection */}
              {activeSection === "data-protection" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Data Protection</h2>
                  <p className="text-gray-300">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                  </p>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Security Measures</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaLock className="text-primary mt-1" />
                        <span>SSL encryption for data transmission</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaShieldAlt className="text-primary mt-1" />
                        <span>Regular security audits and updates</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaUser className="text-primary mt-1" />
                        <span>Access controls and authentication</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Cookies */}
              {activeSection === "cookies" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Cookies</h2>
                  <p className="text-gray-300">
                    We use cookies and similar tracking technologies to track activity on our platform and hold certain information.
                  </p>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Types of Cookies</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaCookie className="text-primary mt-1" />
                        <span>Essential cookies for platform functionality</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaUser className="text-primary mt-1" />
                        <span>Preference cookies for user settings</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaGlobe className="text-primary mt-1" />
                        <span>Analytics cookies for platform improvement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* International Data */}
              {activeSection === "international" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">International Data Transfers</h2>
                  <p className="text-gray-300">
                    Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
                  </p>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Data Protection Standards</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaGlobe className="text-primary mt-1" />
                        <span>Compliance with international data protection regulations</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaShieldAlt className="text-primary mt-1" />
                        <span>Standard contractual clauses for data transfers</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaLock className="text-primary mt-1" />
                        <span>Regular security assessments of international partners</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Your Rights */}
              {activeSection === "rights" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Your Rights</h2>
                  <p className="text-gray-300">
                    You have certain rights regarding your personal information, including:
                  </p>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">User Rights</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaUser className="text-primary mt-1" />
                        <span>Right to access your personal information</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaShieldAlt className="text-primary mt-1" />
                        <span>Right to correct inaccurate data</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaLock className="text-primary mt-1" />
                        <span>Right to request deletion of your data</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaGlobe className="text-primary mt-1" />
                        <span>Right to data portability</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="mt-8 bg-secondary-light rounded-xl border border-primary/20 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="space-y-3">
                <p className="text-gray-300">
                  Email: <span className="text-primary">privacy@SpinKings.com</span>
                </p>
                <p className="text-gray-300">
                  Address: <span className="text-primary">123 Privacy Street, Data City, DC 12345</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 