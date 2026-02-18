/**
 * Seed the database with sample posts and comments.
 * Run from server directory: node src/scripts/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const samplePosts = [
  {
    slug: 'the-ultimate-guide-to-full-body-workouts',
    title: 'The Ultimate Guide to Full-Body Workouts',
    date: '23 JANUARY 2022',
    author: { name: 'ALEX CARTER', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', bio: 'With over a decade of experience in the fitness industry.' },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isEditorsPick: true,
    previousPost: { slug: '5-tips-for-better-cardio-sessions', title: '5 Tips for Better Cardio Sessions' },
    nextPost: { slug: 'meal-prep-basics-for-busy-weeknights', title: 'Meal Prep Basics for Gym Enthusiasts' },
  },
  {
    slug: '5-tips-for-better-cardio-sessions',
    title: '5 Tips For Better Cardio Sessions',
    date: '20 AUGUST 2022',
    author: { name: 'KAYLA BROWN', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', bio: 'Certified personal trainer and nutritionist.' },
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=600&fit=crop',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    slug: 'meal-prep-basics-for-busy-weeknights',
    title: 'Meal Prep Basics For Busy Weeknights',
    date: '18 AUGUST 2022',
    author: { name: 'ANNA BELLA', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', bio: 'Nutrition expert and meal prep enthusiast.' },
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=600&fit=crop',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    slug: 'building-core-strength-exercises-and-benefits',
    title: 'Building Core Strength: Exercises And Benefits',
    date: '15 AUGUST 2022',
    author: { name: 'TOM SMITH', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', bio: 'Strength and conditioning coach.' },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const sampleComments = [
  { postSlug: 'the-ultimate-guide-to-full-body-workouts', author: 'Henry Smith', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', rating: 5 },
  { postSlug: 'the-ultimate-guide-to-full-body-workouts', author: 'Kang Haerin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop', comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', rating: 5 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_db');
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Post.insertMany(samplePosts);
    await Comment.insertMany(sampleComments);
    console.log('Seed completed: posts and comments added.');
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
