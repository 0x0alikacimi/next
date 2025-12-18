"use client";

import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0b0f1a] to-[#020617] px-6">

      {/* Card */}
      <div className="bg-[#0f172a] rounded-2xl shadow-2xl p-8">

        {/* Inner container */}
        <div className="flex w-[880px] max-w-full min-h-[420px] gap-8">

          {/* Credentials */}
          <div className="flex-1 bg-[#111827] rounded-xl p-10 flex flex-col justify-center">

            <h1 className="text-3xl font-semibold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-gray-400 mb-8">
              Login to your account
            </p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-md bg-[#020617] border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-md bg-[#020617] border border-gray-700 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              <button
                className="w-full mt-4 rounded-md bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700 transition"
              >
                Login
              </button>
            </div>

            <div className="text-sm text-gray-400 mt-8">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-400 hover:text-blue-300 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Image holder */}
          <div className="flex-1 bg-[#111827] rounded-xl flex items-center justify-center">
            <div className="border border-white/10 rounded-xl p-6">
              <Image
                src="/image.png"
                alt="Login illustration"
                width={260}
                height={260}
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
