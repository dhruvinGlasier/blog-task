# Blog API (Node.js + Express + MongoDB)

Backend API for the blog: blog management, comments, and review/rating system.

## Requirements

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Setup

1. Install dependencies:

   ```bash
   cd server
   npm install
   ```

2. Copy environment file and set your MongoDB URI:

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/blog_db
   ```

   For MongoDB Atlas, use your connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/blog_db`).

3. Seed the database (optional):

   ```bash
   npm run seed
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

   API base URL: `http://localhost:4000`

## API Reference (REST)

### Health

- **GET** `/api/health` — Health check.

### Blog posts

- **GET** `/api/posts` — List all posts (for static generation or listing).
- **GET** `/api/posts/:slug` — Get one post by slug.
- **POST** `/api/posts` — Create a post.

  Body (JSON):

  - `title` (required)
  - `body` (required)
  - `date` (required)
  - `slug` (optional, auto-generated from title if omitted)
  - `author` (optional) `{ name, avatar?, bio? }`
  - `image` (optional)
  - `isEditorsPick`, `previousPost`, `nextPost` (optional)

### Comments and ratings

- **GET** `/api/posts/:slug/comments` — Get all comments for a post.
- **POST** `/api/posts/:slug/comments` — Add a comment (with rating).

  Body (JSON):

  - `author` (required)
  - `comment` (required)
  - `rating` (required, 1–5)
  - `avatar` (optional)

Comments are stored with date/time; the API returns a formatted date string. Ratings are stored with each comment.

## Project structure

```
server/
├── src/
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   ├── Post.js        # Blog post schema
│   │   └── Comment.js     # Comment schema (author, comment, date, rating)
│   ├── routes/
│   │   └── posts.js       # REST routes for posts and comments
│   ├── scripts/
│   │   └── seed.js        # Seed sample data
│   └── index.js           # Express app entry
├── .env.example
├── package.json
└── README.md
```

## Connecting the Next.js frontend

To use this API for comments instead of static mock data:

1. Ensure the API is running and the DB is seeded.
2. In the frontend, call `GET http://localhost:4000/api/posts/:slug/comments` to fetch comments and `POST http://localhost:4000/api/posts/:slug/comments` to submit a comment (with `author`, `comment`, `rating`).

For static generation, you can fetch posts at build time from `GET http://localhost:4000/api/posts` (or keep using the existing static data in `lib/data.ts`).
