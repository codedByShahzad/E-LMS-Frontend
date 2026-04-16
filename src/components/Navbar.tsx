"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  BookMarked,
} from "lucide-react";
import { useLogoutUserMutation } from "../features/api/authApi";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [logoutUser, { data, isSuccess, isLoading }] =
    useLogoutUserMutation();

  // ✅ logout success handler
  useEffect(() => {
    if (isSuccess) {
      console.log(data?.message || "Logout Successful");

      // optional redirect
      router.push("/login");
    }
  }, [isSuccess, data, router]);

const logoutHandler = async () => {
  try {
    await logoutUser({}).unwrap();

    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);

    router.push("/login");
  } catch (err) {
    console.log(err);
  }
};

  // Fake auth state
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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isProfileOpen && !event.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const mountedUI = mounted ? true : false;

  if (!mountedUI) {
    return (
      <nav className="sticky top-0 z-50 h-16 bg-surface border-b border-border">
        <div className="page-container flex items-center justify-between h-full">
          <div className="w-24 h-6 bg-primary-100 rounded animate-pulse" />
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="page-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary-600" />
              <span className="font-bold">AcademyPro</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href} className="flex gap-1">
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button onClick={() => setIsDark(!isDark)}>
                {isDark ? <Moon /> : <Sun />}
              </button>

              {user ? (
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 bg-primary-500 rounded-full" />
                    <ChevronDown />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg">
                      {profileLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex gap-2 px-4 py-2"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Icon className="w-4 h-4" />
                            {link.label}
                          </Link>
                        );
                      })}

                      {/* LOGOUT BUTTON FIXED */}
                      <button
                        onClick={logoutHandler}
                        disabled={isLoading}
                        className="w-full flex gap-2 px-4 py-2 text-red-500 border-t"
                      >
                        <LogOut className="w-4 h-4" />
                        {isLoading ? "Logging out..." : "Log out"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex gap-2">
                  <Link href="/login">
                    <LogIn /> Sign In
                  </Link>
                  <Link href="/signup">
                    <UserPlus /> Sign Up
                  </Link>
                </div>
              )}

              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}