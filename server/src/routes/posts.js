const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

/**
 * GET /api/posts
 * List all blog posts (for frontend static generation or listing).
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).lean();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/posts/:slug
 * Get a single blog post by slug.
 */
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).lean();
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/posts
 * Create a new blog post.
 * Body: { title, body, date, slug?, author?, image? }
 */
router.post('/', async (req, res) => {
  try {
    const { title, body, date, slug, author, image, isEditorsPick, previousPost, nextPost } = req.body;
    if (!title || !body || !date) {
      return res.status(400).json({ error: 'title, body, and date are required' });
    }
    const generatedSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const post = new Post({
      slug: generatedSlug,
      title,
      body,
      date,
      author: author || { name: 'Anonymous', avatar: '', bio: '' },
      image: image || '',
      isEditorsPick: isEditorsPick || false,
      previousPost: previousPost || undefined,
      nextPost: nextPost || undefined,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'A post with this slug already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/posts/:slug/comments
 * Get all comments for a post (by slug).
 */
router.get('/:slug/comments', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).lean();
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const comments = await Comment.find({ postSlug: req.params.slug }).sort({ date: -1 }).lean();
    const formatted = comments.map((c) => {
      let dateStr = '';
      try {
        dateStr = c.date ? new Date(c.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
      } catch (_) {}
      return {
        id: c._id ? c._id.toString() : '',
        author: c.author,
        avatar: c.avatar || '',
        comment: c.comment,
        rating: c.rating,
        date: dateStr,
      };
    });
    res.json(formatted);
  } catch (error) {
    console.error('GET comments error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch comments' });
  }
});

/**
 * POST /api/posts/:slug/comments
 * Create a comment (with rating) for a post.
 * Body: { author, comment, rating, avatar? }
 */
router.post('/:slug/comments', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const { author, comment, rating, avatar } = req.body;
    if (!author || !comment || rating == null) {
      return res.status(400).json({ error: 'author, comment, and rating are required' });
    }
    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5) {
      return res.status(400).json({ error: 'rating must be between 1 and 5' });
    }
    const newComment = new Comment({
      postSlug: req.params.slug,
      author,
      comment,
      rating: numRating,
      avatar: avatar || '',
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
