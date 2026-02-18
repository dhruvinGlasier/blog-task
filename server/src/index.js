require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

// CORS: allow Vercel and other frontends; set FRONTEND_URL to restrict in production
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((o) => o.trim()).filter(Boolean)
  : [];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    // No FRONTEND_URL = allow all (dev). Else allow list + *.vercel.app
    if (allowedOrigins.length === 0) return callback(null, true);
    if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/posts', postsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Blog API is running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
