const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
}, { _id: false });

const postSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: authorSchema, required: true },
  image: { type: String, default: '' },
  body: { type: String, required: true },
  isEditorsPick: { type: Boolean, default: false },
  previousPost: {
    slug: String,
    title: String,
  },
  nextPost: {
    slug: String,
    title: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);
