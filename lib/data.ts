export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: Author;
  image: string;
  body: string;
  isEditorsPick?: boolean;
  previousPost?: {
    slug: string;
    title: string;
  } | null;
  nextPost?: {
    slug: string;
    title: string;
  } | null;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface TrendingPost {
  id: string;
  category: string;
  date: string;
  description: string;
  image: string;
}

export interface Guide {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
}

export interface RelatedArticle {
  id: string;
  title: string;
  author: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-ultimate-guide-to-full-body-workouts',
    title: 'The Ultimate Guide to Full-Body Workouts',
    date: '23 JANUARY 2022',
    author: {
      name: 'ALEX CARTER',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'With over a decade of experience in the fitness industry, Alex specializes in strength training and functional fitness. Certified by NASM and known for his motivational style, Alex designs workout programs that are both challenging and achievable. His passion lies in helping clients build strength and confidence through personalized training routines. Outside the gym, Alex is an avid runner and enjoys outdoor adventures.',
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,
    isEditorsPick: true,
    previousPost: {
      slug: '5-tips-for-better-cardio-sessions',
      title: '5 Tips for Better Cardio Sessions',
    },
    nextPost: {
      slug: 'meal-prep-basics-for-busy-weeknights',
      title: 'Meal Prep Basics for Gym Enthusiasts',
    },
  },
  {
    slug: '5-tips-for-better-cardio-sessions',
    title: '5 Tips For Better Cardio Sessions',
    date: '20 AUGUST 2022',
    author: {
      name: 'KAYLA BROWN',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      bio: 'Kayla is a certified personal trainer and nutritionist with a passion for helping people achieve their fitness goals through effective cardio training.',
    },
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=600&fit=crop',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,
  },
  {
    slug: 'meal-prep-basics-for-busy-weeknights',
    title: 'Meal Prep Basics For Busy Weeknights',
    date: '18 AUGUST 2022',
    author: {
      name: 'ANNA BELLA',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      bio: 'Anna is a nutrition expert and meal prep enthusiast who helps busy professionals maintain a healthy diet through strategic meal planning.',
    },
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=600&fit=crop',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,
  },
  {
    slug: 'building-core-strength-exercises-and-benefits',
    title: 'Building Core Strength: Exercises And Benefits',
    date: '15 AUGUST 2022',
    author: {
      name: 'TOM SMITH',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      bio: 'Tom is a strength and conditioning coach specializing in core training and functional movement patterns.',
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,
  },
];

export const trendingPosts: TrendingPost[] = [
  {
    id: '1',
    category: 'Culinary',
    date: '13 Jun 2022',
    description: 'Two women in local stand are chatting during morning..',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=100&fit=crop',
  },
  {
    id: '2',
    category: 'Travel',
    date: '22 Jul 2022',
    description: 'Enjoying the sunset on Padar island together',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=150&h=100&fit=crop',
  },
  {
    id: '3',
    category: 'Travel',
    date: '22 Jul 2022',
    description: 'The lush green surroundings of the campgrounds create a...',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=100&fit=crop',
  },
];

export const guides: Guide[] = [
  {
    id: '1',
    name: 'Miranda Rachel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop',
    location: 'Jombang, Jawa timur',
    rating: 4.0,
  },
  {
    id: '2',
    name: 'Danielle Marsh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
    location: 'Wonosobo, Jawa ten...',
    rating: 4.0,
  },
  {
    id: '3',
    name: 'Kang Haerin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
    location: 'Bandung, Jawa barat',
    rating: 5.0,
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Henry Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
    rating: 5,
    date: '23 Aug 2022',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: '2',
    author: 'Kayla Brown',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
    rating: 5,
    date: '23 Aug 2022',
    comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

export const relatedArticles: RelatedArticle[] = [
  {
    id: 'the-ultimate-guide-to-full-body-workouts',
    title: 'The Ultimate Guide to Full-Body Workouts',
    author: 'By Alex Carter',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
  },
  {
    id: '5-tips-for-better-cardio-sessions',
    title: '5 Tips For Better Cardio Sessions',
    author: 'By Kayla Brown',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop',
  },
  {
    id: 'meal-prep-basics-for-busy-weeknights',
    title: 'Meal Prep Basics For Busy Weeknights',
    author: 'By Anna Bella',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop',
  },
  {
    id: 'building-core-strength-exercises-and-benefits',
    title: 'Building Core Strength: Exercises And Benefits',
    author: 'By Tom Smith',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
  },
];

// Simulate API delay
export const fetchComments = (postSlug: string): Promise<Comment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockComments);
    }, 500);
  });
};

