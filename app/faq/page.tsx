"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaSearch, FaChevronDown, FaChevronUp, FaQuestion, FaUser, FaLock, FaMoneyBillWave, FaTrophy, FaMobileAlt, FaShieldAlt } from "react-icons/fa";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const categories = [
    { id: "all", name: "All Questions", icon: <FaQuestion /> },
    { id: "account", name: "Account", icon: <FaUser /> },
    { id: "security", name: "Security", icon: <FaLock /> },
    { id: "payments", name: "Payments", icon: <FaMoneyBillWave /> },
    { id: "rewards", name: "Rewards", icon: <FaTrophy /> },
    { id: "mobile", name: "Mobile App", icon: <FaMobileAlt /> },
  ];

  const faqs = [
    {
      category: "account",
      question: "How do I create an account?",
      answer: "Creating an account is simple! Just click on the 'Sign Up' button, enter your mobile number, and verify with the OTP sent to your phone. Once verified, you can set up your profile and start playing.",
    },
    {
      category: "account",
      question: "Can I change my mobile number?",
      answer: "Yes, you can change your mobile number. Go to your profile settings, select 'Change Mobile Number', and follow the verification process. Note that you'll need to verify the new number with an OTP.",
    },
    {
      category: "security",
      question: "How secure is my account?",
      answer: "We use bank-grade security measures including SSL encryption, two-factor authentication, and regular security audits. Your personal information and transactions are protected with the highest level of security protocols.",
    },
    {
      category: "security",
      question: "What should I do if I forget my password?",
      answer: "If you forget your password, click on 'Forgot Password' on the login page. You'll receive an OTP on your registered mobile number to reset your password securely.",
    },
    {
      category: "payments",
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including UPI, credit/debit cards, net banking, and popular e-wallets. All transactions are secure and encrypted.",
    },
    {
      category: "payments",
      question: "How long do withdrawals take?",
      answer: "Withdrawals are typically processed within 24 hours. The exact time may vary depending on your bank's processing time. We strive to process all withdrawals as quickly as possible.",
    },
    {
      category: "rewards",
      question: "How do I earn rewards?",
      answer: "You can earn rewards by participating in matches, completing daily challenges, and achieving milestones. The better your team performs, the more rewards you can earn.",
    },
    {
      category: "rewards",
      question: "What types of rewards are available?",
      answer: "We offer various rewards including cash prizes, bonus points, exclusive merchandise, and special tournament entries. Check the rewards section for current offers.",
    },
    {
      category: "mobile",
      question: "Is there a mobile app available?",
      answer: "Yes, we have a dedicated mobile app for both Android and iOS devices. You can download it from the respective app stores. The app offers all features available on the web platform.",
    },
    {
      category: "mobile",
      question: "Can I use the same account on multiple devices?",
      answer: "Yes, you can access your account from multiple devices. However, for security reasons, you can only be logged in on one device at a time.",
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen mt-10 sm:mt-20 bg-secondary py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find quick answers to common questions about our platform, features, and services.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-secondary-light border border-primary/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
            />
            <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-secondary-light text-gray-300 hover:bg-primary/20"
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-secondary-light rounded-xl border border-primary/20 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {categories.find(cat => cat.id === faq.category)?.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                </div>
                {expandedItems.includes(index) ? (
                  <FaChevronUp className="text-primary" />
                ) : (
                  <FaChevronDown className="text-primary" />
                )}
              </button>
              {expandedItems.includes(index) && (
                <div className="px-6 py-4 border-t border-primary/20">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-secondary-light p-8 rounded-xl border border-primary/20 max-w-2xl">
            <h3 className="text-2xl font-bold mb-4 text-white">Still Have Questions?</h3>
            <p className="text-gray-300 mb-6">
              Our support team is available 24/7 to help you with any questions or concerns.
            </p>
            <button
              className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/50 border border-primary/30"
            >
              <Link href="#">Contact Support</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
