"use client";

import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Smart Bookmark
        </h1>

        <p className="text-gray-500 mb-8">
          Save and manage your private bookmarks securely.
        </p>

        <LoginButton />

        <p className="text-xs text-gray-400 mt-6">
          Powered by Supabase • Built with Next.js
        </p>
      </div>
    </div>
  );
}
