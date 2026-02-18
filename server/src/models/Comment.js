const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postSlug: { type: String, required: true, index: true },
  author: { type: String, required: true },
  avatar: { type: String, default: '' },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

// Return date as formatted string in API responses (safe for production)
commentSchema.set('toJSON', {
  transform: (doc, ret) => {
    try {
      ret.id = ret._id ? ret._id.toString() : '';
      ret.date = ret.date
        ? new Date(ret.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        : '';
    } catch (e) {
      ret.date = '';
    }
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

module.exports = mongoose.model('Comment', commentSchema);
