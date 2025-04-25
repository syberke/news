
export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  imageUrl: string;
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  readTime: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  articleCount: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  category: string;
  author: string;
  authorId: string;
  downloadCount: number;
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  bio: string;
  profileImageUrl: string;
  createdAt: Date;
  savedArticles: string[];
  bookmarkedResources: string[];
}

export interface Newsletter {
  id: string;
  email: string;
  name: string;
  subscribedAt: Date;
  categories: string[];
  active: boolean;
}
