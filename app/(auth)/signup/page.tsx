"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/src/features/api/authApi";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [
    registerUser,
    { data, error, isLoading, isSuccess, isError },
  ] = useRegisterUserMutation();

  // ✅ Redirect after success
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    }
  }, [isSuccess, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    registerUser(form);
  };

  const errorMessage =
    (error as any)?.data?.message || "Something went wrong";

  return (
    <div className="min-h-screen flex bg-[#0f0f13] font-sans">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-[52%] relative overflow-hidden flex-col justify-between p-14">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600" />

        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Start your journey
            <br />
            <span className="text-white/80">with Learnly</span>
          </h1>
          <p className="text-white/70 max-w-sm">
            Join thousands of learners building real-world skills and leveling
            up their careers.
          </p>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          © 2026 Learnly. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full lg:w-[48%] items-center justify-center px-6 bg-[#fafafa]">
        <div className="w-full max-w-[420px]">

          <h2 className="text-[28px] font-bold text-gray-900 mb-1">
            Create your account
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Get started in seconds
          </p>

          {/* ERROR */}
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
              <p className="text-red-700 text-sm font-semibold">
                Signup failed
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
                Account created! Redirecting...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500
                disabled:opacity-50"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500
                disabled:opacity-50"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                  focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500
                  disabled:opacity-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={
                isLoading ||
                isSuccess ||
                !form.name ||
                !form.email ||
                !form.password
              }
              className="w-full py-3 rounded-xl font-semibold text-sm text-white
                bg-gradient-to-r from-green-600 to-emerald-600
                hover:from-green-700 hover:to-emerald-700
                disabled:opacity-70 disabled:cursor-not-allowed
                transition-all"
            >
              {isLoading
                ? "Creating account..."
                : isSuccess
                ? "Redirecting..."
                : "Create Account"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-xs text-gray-400 text-center mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}