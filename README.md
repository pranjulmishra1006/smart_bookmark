# Smart Bookmark App

A full-stack bookmark manager built with **Next.js (App Router)** and **Supabase**.

Users can securely log in using Google OAuth and manage their own private bookmarks in real-time.

---

## Live Demo

🔗 https://smart-bookmark-pearl.vercel.app

---

##  Features

- Google OAuth authentication (Supabase Auth)
- Add bookmark (Title + URL)
- Delete bookmark
- Private bookmarks per user (Row Level Security)
- Real-time updates (no page refresh)
- Responsive (Desktop + Mobile)
- Deployed on Vercel

---

##  Tech Stack

- Next.js (App Router)
- Supabase (Auth + PostgreSQL + Realtime)
- Tailwind CSS
- Vercel

---

## Database Design

Table: `bookmarks`

- `id` (uuid, primary key)
- `user_id` (foreign key → auth.users.id)
- `title` (text)
- `url` (text)
- `created_at` (timestamp)

Row Level Security (RLS) ensures users can only access their own bookmarks using:

```sql
auth.uid() = user_id
