"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginButton() {
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
    >
      Continue with Google
    </button>
  );
}
