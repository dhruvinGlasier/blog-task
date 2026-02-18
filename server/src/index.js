require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
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
