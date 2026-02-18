# Blog Project (Frontend + Backend)

A full-stack blog with a **Next.js** frontend and a **Node.js / Express / MongoDB** backend. The frontend supports static blog pages, client-side comments, and an optional connection to the backend API for posts and comments.

---

## Prerequisites

- **Node.js** 18 or later ([nodejs.org](https://nodejs.org))
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for the backend)
- **npm** (comes with Node.js)

---

## Project structure

```
Amrytt Task/
├── README.md                 # This file
├── package.json              # Frontend (Next.js) dependencies
├── .env.local.example        # Frontend env example
│
├── pages/                    # Next.js pages
│   ├── _app.tsx
│   ├── index.tsx
│   └── blog/
│       └── [slug].tsx        # Dynamic blog post page
├── components/               # React components
├── lib/                      # Data, API client, types
├── styles/
│
└── server/                   # Backend API
    ├── package.json          # Backend dependencies
    ├── .env.example
    ├── README.md             # Backend-only details
    └── src/
        ├── index.js          # Express app entry
        ├── config/db.js      # MongoDB connection
        ├── models/            # Post, Comment schemas
        ├── routes/posts.js   # REST routes
        └── scripts/seed.js   # Seed sample data
```

---

## 1. Backend (API)

The backend serves blog posts and comments over REST. It is **optional**: the frontend can run with static/mock data only.

### Requirements

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

### Setup and run

1. **Go to the server folder and install dependencies**

   ```bash
   cd server
   npm install
   ```

2. **Create environment file**

   ```bash
   cp .env.example .env
   ```

3. **Edit `server/.env`**

   - **Local MongoDB:**
     ```env
     PORT=4000
     MONGODB_URI=mongodb://localhost:27017/blog_db
     ```
   - **MongoDB Atlas:** set `MONGODB_URI` to your connection string (e.g. `mongodb+srv://user:password@cluster.mongodb.net/blog_db`).

4. **Seed the database (recommended)**

   ```bash
   npm run seed
   ```

   This adds sample posts and comments.

5. **Start the API**

   ```bash
   npm run dev
   ```

   The API will be at **http://localhost:4000**.

### Backend scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start API with auto-reload     |
| `npm start`    | Start API (production)         |
| `npm run seed` | Seed DB with sample data       |

### API endpoints (summary)

- `GET /api/health` — Health check
- `GET /api/posts` — List all posts
- `GET /api/posts/:slug` — Get one post
- `POST /api/posts` — Create a post (body: `title`, `body`, `date`, etc.)
- `GET /api/posts/:slug/comments` — Get comments for a post
- `POST /api/posts/:slug/comments` — Add a comment (body: `author`, `comment`, `rating`)

See **`server/README.md`** for full API details.

---

## 2. Frontend (Next.js)

The frontend is a Next.js app with blog listing, dynamic post pages, comments, and optional API integration.

### Requirements

- Node.js 18+

### Setup and run

1. **Install dependencies (from project root)**

   ```bash
   npm install
   ```

2. **Environment (optional)**

   To use the backend for **comments and posts**:

   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

   - If you **do not** set this (or leave it empty), the app uses **static/mock data** from `lib/data.ts`.
   - If you **set it** to your API URL (e.g. `http://localhost:4000`), the app will fetch posts and comments from the backend. When running on **localhost**, the frontend also defaults to `http://localhost:4000` if `NEXT_PUBLIC_API_URL` is not set.

3. **Start the dev server**

   ```bash
   npm run dev
   ```

   Open **http://localhost:3000**.

### Frontend scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start Next.js dev server |
| `npm run build`  | Production build         |
| `npm start`     | Run production build     |
| `npm run lint`  | Run ESLint               |

---

## Running frontend and backend together

1. **Start MongoDB** (if using a local instance).

2. **Start the backend**

   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MONGODB_URI
   npm run seed
   npm run dev
   ```

   Leave this terminal running. API: **http://localhost:4000**.

3. **Start the frontend** (new terminal, from project root)

   ```bash
   npm install
   cp .env.local.example .env.local
   # Optional: set NEXT_PUBLIC_API_URL=http://localhost:4000 in .env.local
   npm run dev
   ```

   Open **http://localhost:3000**. Blog posts: **http://localhost:3000/blog/the-ultimate-guide-to-full-body-workouts** (or any slug from seed data).

4. **Behavior**

   - With **`NEXT_PUBLIC_API_URL`** set (or default on localhost): comments load from and submit to the API; build can use the API for post data.
   - Without API URL: blog uses static data from `lib/data.ts`; comments use mock data.

---

## Environment variables

### Frontend (`.env.local`)

| Variable               | Required | Description |
|------------------------|----------|-------------|
| `NEXT_PUBLIC_API_URL`  | No       | Backend base URL (e.g. `http://localhost:4000`). Omit to use static/mock data. |

### Backend (`server/.env`)

| Variable     | Required | Description |
|-------------|----------|-------------|
| `PORT`      | No       | API port (default: 4000). |
| `MONGODB_URI` | Yes    | MongoDB connection string. |

---

## Tech stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, react-slick
- **Backend:** Node.js, Express, Mongoose, MongoDB
- **Features:** Static generation (`getStaticProps` / `getStaticPaths`), client-side comments, optional REST API, rating/review on comments

---

## Troubleshooting

- **“Cannot connect to MongoDB”**  
  Ensure MongoDB is running locally or your Atlas URI in `server/.env` is correct and the IP is allowlisted.

- **Comments not saving / not loading**  
  Ensure the backend is running and `NEXT_PUBLIC_API_URL` in `.env.local` points to it (e.g. `http://localhost:4000`). Restart the Next.js dev server after changing `.env.local`.

- **Build error about serializing `undefined`**  
  This was fixed so that missing previous/next post are sent as `null`. Ensure you’re on the latest code for `pages/blog/[slug].tsx`.

- **Port already in use**  
  Change `PORT` in `server/.env` or the port in your Next.js config if 4000 or 3000 is taken.
