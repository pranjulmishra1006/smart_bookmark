"use client";

import { useState } from "react";

export default function AddBookmarkForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !url) return;

    onAdd(title, url);
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
     
<div className="flex flex-col md:flex-row gap-4 mb-6">
  <input
    className="border p-3 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
    placeholder="Bookmark Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  <input
    className="border p-3 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
    placeholder="Bookmark URL"
    value={url}
    onChange={(e) => setUrl(e.target.value)}
  />
  <button
    onClick={addBookmark}
    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
  >
    Add
  </button>
</div>

    </form>
  );
}
