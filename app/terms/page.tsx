"use client";

import React, { useState } from "react";
import { FaGavel, FaUser, FaLock, FaMoneyBillWave, FaExclamationTriangle, FaQuestion } from "react-icons/fa";

export default function Terms() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: <FaGavel /> },
    { id: "account", title: "Account Terms", icon: <FaUser /> },
    { id: "usage", title: "Usage Rules", icon: <FaLock /> },
    { id: "payments", title: "Payments", icon: <FaMoneyBillWave /> },
    { id: "liability", title: "Liability", icon: <FaExclamationTriangle /> },
    { id: "general", title: "General Terms", icon: <FaQuestion /> },
  ];

  return (
    <main className="min-h-screen mt-10  bg-secondary py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Terms of <span className="text-gradient">Service</span>
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
                    Welcome to TopCricLeague. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read these terms carefully before using our services.
                  </p>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Key Terms</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaGavel className="text-primary mt-1" />
                        <span>You must be at least 18 years old to use our services</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaLock className="text-primary mt-1" />
                        <span>You are responsible for maintaining the security of your account</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaUser className="text-primary mt-1" />
                        <span>You must provide accurate and complete information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Account Terms */}
              {activeSection === "account" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Account Terms</h2>
                  <p className="text-gray-300">
                    When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the security of your account.
                  </p>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Account Responsibilities</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaUser className="text-primary mt-1" />
                        <span>Maintain accurate account information</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaLock className="text-primary mt-1" />
                        <span>Keep your password secure</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaExclamationTriangle className="text-primary mt-1" />
                        <span>Report any unauthorized access immediately</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Usage Rules */}
              {activeSection === "usage" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Usage Rules</h2>
                  <p className="text-gray-300">
                    You agree to use our platform in accordance with all applicable laws and regulations. The following activities are strictly prohibited:
                  </p>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Prohibited Activities</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaExclamationTriangle className="text-primary mt-1" />
                        <span>Creating multiple accounts</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaLock className="text-primary mt-1" />
                        <span>Attempting to bypass security measures</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaUser className="text-primary mt-1" />
                        <span>Sharing account credentials</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Payments */}
              {activeSection === "payments" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Payments</h2>
                  <p className="text-gray-300">
                    All payments are processed securely through our payment partners. By making a payment, you agree to our payment terms and conditions.
                  </p>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Payment Terms</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaMoneyBillWave className="text-primary mt-1" />
                        <span>All payments are non-refundable</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaUser className="text-primary mt-1" />
                        <span>You are responsible for all charges</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaLock className="text-primary mt-1" />
                        <span>Payment information is encrypted</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Liability */}
              {activeSection === "liability" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Liability</h2>
                  <p className="text-gray-300">
                    Our liability is limited to the maximum extent permitted by law. We are not responsible for any indirect, incidental, or consequential damages.
                  </p>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Limitations</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaExclamationTriangle className="text-primary mt-1" />
                        <span>No guarantee of uninterrupted service</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaGavel className="text-primary mt-1" />
                        <span>Limited liability for third-party services</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaLock className="text-primary mt-1" />
                        <span>No responsibility for user-generated content</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* General Terms */}
              {activeSection === "general" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">General Terms</h2>
                  <p className="text-gray-300">
                    These terms constitute the entire agreement between you and TopCricLeague regarding your use of our services.
                  </p>
                  <div className="bg-secondary p-6 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Additional Terms</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaGavel className="text-primary mt-1" />
                        <span>Terms may be updated periodically</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaQuestion className="text-primary mt-1" />
                        <span>Governing law and jurisdiction</span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <FaExclamationTriangle className="text-primary mt-1" />
                        <span>Severability of terms</span>
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
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="space-y-3">
                <p className="text-gray-300">
                  Email: <span className="text-primary">legal@TopCricLeague.com</span>
                </p>
                <p className="text-gray-300">
                  Address: <span className="text-primary">123 Legal Street, Terms City, TC 12345</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 