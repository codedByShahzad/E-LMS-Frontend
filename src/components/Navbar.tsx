"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Search,
  Menu,
  X,
  Home,
  BookOpen,
  MessageCircle,
  Award,
  LogIn,
  UserPlus,
  Sun,
  Moon,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  ChevronDown,
  BookMarked
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Set this to true to show logged in state, false for logged out
  const user = true;

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isProfileOpen && !event.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: "/community", label: "Community", icon: MessageCircle },
    { href: "/mentors", label: "Mentors", icon: Award },
  ];

  const profileLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/my-learning", label: "My learning", icon: BookMarked },
    { href: "/profile", label: "Edit Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (href: any) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  // Check if any profile link is active
  const activeProfileLink = profileLinks.find(link => isActive(link.href));

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 h-16 bg-surface border-b border-border">
        <div className="page-container flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-100 animate-pulse" />
            <div className="w-24 h-6 bg-primary-100 rounded animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-surface/95 backdrop-blur-md shadow-nav border-b border-border"
            : "bg-surface border-b border-border"
        }`}
      >
        <div className="page-container">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo & Title (Always visible) */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/30 transition-shadow">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-content-primary tracking-tight">
                Academy<span className="text-primary-600">Pro</span>
              </span>
            </Link>

            {/* Center - Navigation (Desktop only, always visible) */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link ${active ? "nav-link-active" : ""}`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Side - Conditional based on user */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button className="hidden sm:flex btn btn-ghost p-2.5 text-content-secondary hover:text-content-primary">
                <Search className="w-5 h-5" />
              </button>

              {/* Dark/Light Mode Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="relative w-14 h-8 rounded-full bg-surface-sunken border border-border p-1 transition-colors duration-300 hover:border-primary-300"
                aria-label="Toggle dark mode"
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                    isDark ? "translate-x-6" : "translate-x-0"
                  }`}
                >
                  {isDark ? (
                    <Moon className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Sun className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
              </button>

              {user ? (
                /* Logged In - Profile Dropdown */
                <div className="relative profile-dropdown hidden md:block">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-surface-sunken transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-semibold">
                      JD
                    </div>
                    <ChevronDown className={`w-4 h-4 text-content-tertiary transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-surface rounded-xl border border-border shadow-dropdown py-2 animate-fade-in">
                      {/* My Account Section */}
                      <div className="px-4 py-2">
                        <p className="text-sm font-semibold text-content-primary mb-1">My Account</p>
                      </div>
                      
                      {/* Regular Links */}
                      <div className="py-1">
                        {profileLinks.slice(1).map((link) => {
                          const Icon = link.icon;
                          const active = isActive(link.href);
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                                active
                                  ? "text-primary-600 font-medium bg-primary-50"
                                  : "text-content-secondary hover:text-content-primary hover:bg-surface-sunken"
                              }`}
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Icon className={`w-4 h-4 ${active ? "text-primary-600" : ""}`} />
                              {link.label}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Dashboard - Highlighted if active */}
                      <div className="px-2 pt-1">
                        <Link
                          href="/dashboard"
                          className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                            isActive("/dashboard")
                              ? "text-primary-600 bg-primary-100"
                              : "text-content-primary  hover:bg-primary-50"
                          }`}
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <LayoutDashboard className={`w-4 h-4 ${isActive("/dashboard") ? "text-primary-600" : "text-primary-600"}`} />
                          Dashboard
                        </Link>
                      </div>

                      {/* Log out */}
                      <div className="py-1 border-t border-border mt-1">
                        <button
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:text-error hover:bg-error-light transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Not Logged In - Auth Buttons */
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login" className="btn btn-ghost">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link href="/signup" className="btn btn-primary">
                    <UserPlus className="w-4 h-4" />
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden btn btn-ghost p-2.5"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-surface border-l border-border z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-content-primary">AcademyPro</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn btn-ghost p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2.5 bg-surface-sunken border border-border rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                    active
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-content-secondary hover:text-content-primary hover:bg-surface-sunken"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? "text-primary-600" : ""}`} />
                  {link.label}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="my-4 border-t border-border" />

            {/* Mobile User Section */}
            {user ? (
              <>
                {/* Mobile Profile Header */}
                <div className="px-4 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-surface-sunken rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-content-primary">John Doe</p>
                      <p className="text-xs text-content-tertiary">john@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Profile Links */}
                <div className="space-y-1 px-2">
                  {profileLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                          active
                            ? "text-primary-600 font-medium bg-primary-50"
                            : "text-content-secondary hover:text-content-primary hover:bg-surface-sunken"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className={`w-4 h-4 ${active ? "text-primary-600" : ""}`} />
                        {link.label}
                      </Link>
                    );
                  })}
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-error hover:text-error hover:bg-error-light rounded-lg transition-colors mt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              </>
            ) : null}

            {/* Mobile Dark Mode Toggle */}
            <div className="px-4 mt-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="w-full flex items-center justify-between p-3 bg-surface-sunken rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                    {isDark ? (
                      <Moon className="w-4 h-4 text-white" />
                    ) : (
                      <Sun className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-content-primary">
                    {isDark ? "Dark Mode" : "Light Mode"}
                  </span>
                </div>
                <div className="relative w-12 h-6 rounded-full bg-border p-0.5">
                  <div
                    className={`w-5 h-5 rounded-full bg-surface shadow-sm transform transition-transform duration-300 ${
                      isDark ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Mobile Auth Buttons (Only show if not logged in) */}
            {!user && (
              <div className="px-4 space-y-2 mt-4">
                <Link 
                  href="/login" 
                  className="btn btn-outline w-full justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="btn btn-primary w-full justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus className="w-4 h-4" />
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}