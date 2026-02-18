# Setup Instructions

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Routes

- `/` - Home page with blog post listings
- `/blog/the-ultimate-guide-to-full-body-workouts` - Main blog post
- `/blog/5-tips-for-better-cardio-sessions` - Blog post 2
- `/blog/meal-prep-basics-for-busy-weeknights` - Blog post 3
- `/blog/building-core-strength-exercises-and-benefits` - Blog post 4

## Features Implemented

✅ Next.js 14 with TypeScript
✅ Tailwind CSS for styling
✅ Static Site Generation (SSG) with `getStaticProps` and `getStaticPaths`
✅ Dynamic blog post routes
✅ Client-side comments fetching with `useEffect`
✅ Dynamic component loading with `next/dynamic` (Markdown Editor)
✅ Fully responsive design
✅ Pixel-perfect UI matching the design
✅ Clean modular folder structure
✅ Semantic HTML
✅ Performance optimizations

## Project Structure

```
├── components/          # Reusable React components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Header.tsx      # Navigation header
│   ├── Sidebar.tsx     # Right sidebar (Trending Posts & Guides)
│   ├── Comments.tsx    # Comments section with form
│   ├── AboutAuthor.tsx # Author information section
│   ├── RelatedArticles.tsx # Related articles grid
│   └── MarkdownEditor.tsx  # Dynamically loaded editor
├── lib/
│   └── data.ts         # Mock data and API simulation
├── pages/
│   ├── _app.tsx        # App wrapper
│   ├── index.tsx       # Home page
│   └── blog/
│       └── [slug].tsx  # Dynamic blog post page
└── styles/
    └── globals.css     # Global styles with Tailwind
```

## Build for Production

```bash
npm run build
npm start
```

