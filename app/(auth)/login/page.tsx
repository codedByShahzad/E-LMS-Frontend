"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/src/features/api/authApi";

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
        router.push("/dashboard");
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
    <div className="min-h-screen flex font-sans bg-[#0f0f13]">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-[52%] relative overflow-hidden flex-col justify-between p-14">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1040] via-[#0f0f13] to-[#0d1f3c]" />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #6c3fc5 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #1e6fcf 0%, transparent 40%),
                              radial-gradient(circle at 60% 80%, #0ea5e9 0%, transparent 35%)`,
          }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold">L</span>
          </div>
          <span className="text-white font-semibold text-lg">Learnly</span>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-5">
            Master skills that shape your future
          </h1>
          <p className="text-white/50 max-w-sm">
            Premium courses, expert mentors, and a thriving community.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full lg:w-[48%] items-center justify-center px-6 bg-[#fafafa]">
        <div
          className={`w-full max-w-[420px] transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-[28px] font-bold text-gray-900 mb-1">
            Welcome back
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Sign in to continue your learning journey
          </p>

          {/* ERROR */}
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
              <p className="text-red-700 text-sm font-semibold">
                Login failed
              </p>
              <p className="text-red-500 text-xs mt-1">
                {errorMessage}
              </p>
            </div>
          )}

          {/* SUCCESS */}
          {isSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-6">
              <p className="text-emerald-700 text-sm font-semibold">
                Login successful! Redirecting...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 border rounded-xl"
              required
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border rounded-xl"
                required
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
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
              className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-violet-600 to-blue-600"
            >
              {isLoading
                ? "Signing in..."
                : isSuccess
                ? "Redirecting..."
                : "Sign In"}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-violet-600">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}