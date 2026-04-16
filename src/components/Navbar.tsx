"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  GraduationCap,
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
  BookMarked,
} from "lucide-react";

import {
  useLogoutUserMutation,
  useLoadUserQuery,
} from "../features/api/authApi";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ RESTORE SESSION: This fetches user from cookie on every page load
  const { isLoading: isAuthLoading } = useLoadUserQuery(undefined, {
    skip: false, // Always run to check session
  });

  const user = useSelector((state: RootState) => state.auth.user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [logoutUser, { isLoading: isLogoutLoading }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutUser({}).unwrap();
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
      router.push("/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/student", label: "Home", icon: Home },
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: "/community", label: "Community", icon: MessageCircle },
    { href: "/mentors", label: "Mentors", icon: Award },
  ];

  const profileLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/student/learning", label: "My learning", icon: BookMarked },
    { href: "/student/profile", label: "Edit Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  // ✅ LOADING STATE: Show skeleton while checking auth
  if (!mounted || isAuthLoading) {
    return (
      <nav className="sticky top-0 z-50 h-16 bg-surface border-b border-border">
        <div className="page-container flex items-center justify-between h-full">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="hidden md:flex gap-4">
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`sticky top-0 z-50 bg-surface border-b border-border transition-shadow ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary-600" />
            <span className="font-bold text-lg">AcademyPro</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary-600"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isDark ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* ✅ USER SECTION: Shows avatar if logged in, buttons if not */}
            {user ? (
              <div className="relative">
                {/* Avatar Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                    <Image
                      src={user?.photoUrl || "https://i.pravatar.cc/150"}
                      alt={user?.name || "profile"}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                    {/* User Info Header */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    {/* Profile Links */}
                    {profileLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Icon className="w-4 h-4" />
                          {link.label}
                        </Link>
                      );
                    })}

                    {/* Logout */}
                    <button
                      onClick={logoutHandler}
                      disabled={isLogoutLoading}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      {isLogoutLoading ? "Logging out..." : "Log out"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ✅ NOT LOGGED IN: Show Sign In / Sign Up buttons */
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="page-container py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}

            {!user && (
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}