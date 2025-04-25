
import { Article } from '@/types';

export const dummyArticles: Article[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    slug: 'introduction-to-web-development',
    summary: 'Learn the basics of web development including HTML, CSS, and JavaScript.',
    content: '<h2>Getting Started with Web Development</h2><p>Web development is an exciting field that combines creativity with technical skills. In this article, we\'ll explore the fundamentals that every aspiring web developer should know.</p><h3>The Three Core Technologies</h3><p>1. HTML - The structure<br>2. CSS - The presentation<br>3. JavaScript - The functionality</p>',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'Programming',
    author: 'John Doe',
    authorId: 'author1',
    readTime: 5,
    featured: true,
    published: true,
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-04-20'),
    tags: ['web', 'html', 'css', 'javascript'],
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    slug: 'advanced-react-patterns',
    summary: 'Explore advanced React patterns and best practices for building scalable applications.',
    content: '<h2>Advanced React Design Patterns</h2><p>As your React applications grow in complexity, it becomes crucial to implement robust design patterns. Let\'s explore some advanced patterns that can help you write more maintainable code.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    category: 'React',
    author: 'Jane Smith',
    authorId: 'author2',
    readTime: 8,
    featured: true,
    published: true,
    createdAt: new Date('2024-04-21'),
    updatedAt: new Date('2024-04-21'),
    tags: ['react', 'javascript', 'patterns', 'frontend'],
  }
];
