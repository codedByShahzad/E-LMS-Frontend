"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/src/features/api/authApi";
import { 
  GraduationCap, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  // Chrome,
  // Github,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [
    loginUser,
    { data, error, isError, isLoading, isSuccess }
  ] = useLoginUserMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Redirect after login + store token
  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        router.push("/student");
      }, 1000);
    }
  }, [isSuccess, data, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    loginUser(form);
  };

  const errorMessage =
    (error as any)?.data?.message ||
    "Invalid email or password. Please try again.";

  return (
    <div className="min-h-screen flex font-sans bg-surface-elevated">
      {/* LEFT PANEL - Dark Gradient Side */}
      <div className="hidden lg:flex w-[55%] relative overflow-hidden flex-col justify-between p-12 bg-gradient-to-br from-primary-900 via-[#0f0f13] to-secondary-900">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-400/10 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Academy Pro</span>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Master skills that <span className="text-gradient bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">shape your future</span>
          </h1>
          <p className="text-content-secondary text-lg leading-relaxed">
            Access premium courses, learn from industry experts, and join a thriving community of learners worldwide.
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-8 mt-10">
            <div>
              <p className="text-3xl font-bold text-white">10K+</p>
              <p className="text-content-tertiary text-sm">Courses</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-content-tertiary text-sm">Instructors</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-3xl font-bold text-white">1M+</p>
              <p className="text-content-tertiary text-sm">Students</p>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div>
              <p className="text-white/80 text-sm italic mb-2">"This platform transformed my career. The courses are practical and the mentors are world-class."</p>
              <p className="text-primary-400 text-xs font-semibold">John Doe • Software Engineer at Google</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Login Form */}
      <div className="flex w-full lg:w-[45%] items-center justify-center px-6 py-12 bg-surface">
        <div
          className={`w-full max-w-md transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-content-primary">Academy Pro</span>
            </div>
            <h2 className="text-heading-1 mb-2 text-content-primary">
              Welcome back
            </h2>
            <p className="text-body text-content-secondary">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* ERROR */}
          {isError && (
            <div className="flex items-start gap-3 bg-error-light border border-error/20 rounded-xl px-4 py-4 mb-6 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-error font-semibold text-sm">
                  Login failed
                </p>
                <p className="text-error/80 text-sm mt-1">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {isSuccess && (
            <div className="flex items-center gap-3 bg-success-light border border-success/20 rounded-xl px-4 py-4 mb-6 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <p className="text-success font-semibold text-sm">
                Login successful! Redirecting...
              </p>
            </div>
          )}

          

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-surface text-content-tertiary font-medium">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="input-label">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-tertiary" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isLoading || isSuccess}
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="input-label">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-tertiary" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  disabled={isLoading || isSuccess}
                  className="input-field pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-content-tertiary hover:text-content-secondary transition-colors"
                  disabled={isLoading || isSuccess}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500 focus:ring-2"
                />
                <span className="text-small text-content-secondary">Remember me</span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-small font-medium text-primary-600 hover:text-primary-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={
                isLoading ||
                isSuccess ||
                !form.email ||
                !form.password
              }
              className="btn btn-primary w-full btn-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Redirecting...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-small text-content-secondary text-center mt-8">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
            >
              Create one for free
            </Link>
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-content-tertiary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">Secure SSL</span>
            </div>
            <div className="flex items-center gap-2 text-content-tertiary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}