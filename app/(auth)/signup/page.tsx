"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-green-600 text-white flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-4">
          Start Your Journey 🚀
        </h1>
        <p className="text-lg opacity-90">
          Create your account and unlock access to powerful learning tools.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Create account
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your details to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}