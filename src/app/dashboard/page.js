"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  
  useEffect(() => {
  if (!user) return;

  const channel = supabase
    .channel("public:bookmarks")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bookmarks",
      },
      (payload) => {
        console.log("Realtime:", payload);
        fetchBookmarks();
      }
    )
    .subscribe((status) => {
      console.log("Status:", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}, [user]);


  
  const addBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setUrl("");
  };

  
  const deleteBookmark = async (id) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!user) return null;

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-8">
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">

      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-lg sm:text-xl font-semibold break-words">
          Welcome <span className="text-slate-600">{user.email}</span>
        </h2>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
        >
          Logout
        </button>
      </div>

      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Bookmark Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="text"
          placeholder="Bookmark URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={addBookmark}
          className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition cursor-pointer w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      
      {bookmarks.length === 0 ? (
        <p className="text-gray-500 text-center">No bookmarks yet.</p>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="break-all">
                <p className="font-medium">{bookmark.title}</p>
                <a
                  href={bookmark.url}
                  target="_blank"
                  className="text-blue-600 text-sm"
                >
                  {bookmark.url}
                </a>
              </div>

              <button
                onClick={() => deleteBookmark(bookmark.id)}
                className="text-red-500 hover:text-red-600 font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}
