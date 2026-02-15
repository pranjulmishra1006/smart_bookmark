# Smart Bookmark App

A full-stack bookmark manager built using Next.js (App Router) and Supabase.

This application allows users to securely log in using Google OAuth and manage their own private bookmarks in real-time.

--------------------------------------------------

# LIVE DEMO

https://smart-bookmark-pearl.vercel.app

--------------------------------------------------

# FEATURES

- Google OAuth authentication using Supabase
- Add bookmark (Title + URL)
- Delete bookmark
- Private bookmarks per user (Row Level Security enabled)
- Real-time updates without page refresh
- Responsive design (Desktop + Mobile)
- Deployed on Vercel

--------------------------------------------------

# TECH STACK

- Next.js (App Router)
- Supabase (Authentication + PostgreSQL + Realtime)
- Tailwind CSS
- Vercel

--------------------------------------------------

# DATABASE DESIGN

Table Name: bookmarks

Columns:
- id (uuid, primary key)
- user_id (uuid, foreign key referencing auth.users.id)
- title (text)
- url (text)
- created_at (timestamp)

--------------------------------------------------

# ROW LEVEL SECURITY (RLS)

RLS ensures that users can only access their own bookmarks.

Policies used:

SELECT Policy:
auth.uid() = user_id

INSERT Policy:
auth.uid() = user_id

DELETE Policy:
auth.uid() = user_id

--------------------------------------------------

# REAL-TIME IMPLEMENTATION

Supabase Realtime subscription listens to changes in the bookmarks table.

Whenever a bookmark is added or deleted, the UI updates automatically without refreshing the page.

This allows multiple tabs to stay synchronized.

--------------------------------------------------

# LOCAL SETUP

1. Clone the repository:

git clone https://github.com/your-username/your-repo-name.git

2. Install dependencies:

npm install

3. Create a .env.local file in the root folder and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Run the development server:

npm run dev

Open in browser:
http://localhost:3000

--------------------------------------------------

# DEPLOYMENT

- Hosted on Vercel
- Environment variables configured in Vercel dashboard
- Auto deploy from main branch

--------------------------------------------------

# CHALLENGES FACED

- Understanding and configuring Row Level Security correctly
- Implementing Supabase Realtime subscription
- Handling user session during initial render
- Fixing OAuth redirect configuration after deployment

These were solved by properly configuring policies, debugging realtime subscriptions, and updating Supabase authentication settings.

--------------------------------------------------

# AUTHOR

Pranjul Mishra

--------------------------------------------------

# PROJECT STATUS

- Authentication implemented
- Add and delete bookmark functionality completed
- Private user data enforced with RLS
- Real-time updates working
- Responsive UI completed
- Successfully deployed
