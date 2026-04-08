"use client";

import { useState } from "react";
import { Search, Sparkles, TrendingUp, Users, PlayCircle } from "lucide-react";

export default function StudentHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const popularSearches = [
    "Web Development",
    "Python",
    "Data Science",
    "UI/UX Design",
    "Machine Learning",
    "Digital Marketing"
  ];

  const stats = [
    { icon: PlayCircle, value: "10K+", label: "Courses" },
    { icon: Users, value: "500+", label: "Instructors" },
    { icon: TrendingUp, value: "1M+", label: "Students" }
  ];

  return (
    <section className="relative overflow-hidden bg-surface-elevated">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #4F46E5 1px, transparent 1px),
                           linear-gradient(to bottom, #4F46E5 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="page-container relative z-10">
        <div className="py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                Unlock Your Potential Today
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-display lg:text-6xl font-bold text-content-primary mb-6 leading-tight">
              Learn from the best{" "}
              <span className="text-gradient bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                instructors
              </span>{" "}
              worldwide
            </h1>

            {/* Subheading */}
            <p className="text-body-lg text-content-secondary mb-10 max-w-2xl mx-auto">
              Access 10,000+ premium courses in development, design, business, and more. 
              Start your learning journey today.
            </p>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto mb-8">
              <div 
                className={`relative bg-surface rounded-2xl shadow-card transition-all duration-300 ${
                  isFocused ? "shadow-card-hover ring-2 ring-primary-500/20" : ""
                }`}
              >
                <div className="flex items-center p-2">
                  <div className="pl-4 pr-3">
                    <Search className={`w-6 h-6 transition-colors ${isFocused ? "text-primary-600" : "text-content-tertiary"}`} />
                  </div>
                  <input
                    type="text"
                    placeholder="What do you want to learn today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-1 py-4 text-lg text-content-primary bg-transparent border-none outline-none placeholder:text-content-tertiary"
                  />
                  <button className="btn btn-primary btn-lg rounded-xl px-8">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
              <span className="text-small text-content-tertiary mr-2">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-4 py-2 text-small text-content-secondary bg-surface border border-border rounded-full hover:border-primary-300 hover:text-primary-600 transition-all"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 lg:gap-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-content-primary">{stat.value}</p>
                      <p className="text-small text-content-secondary">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}