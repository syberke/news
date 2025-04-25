
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Category } from '@/types';
import { getCategories } from '@/services/categoryService';

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="news-container">
        <h2 className="section-title">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-container">
        <h2 className="section-title">Browse Categories</h2>
        <p className="text-center py-6 text-destructive">{error}</p>
      </div>
    );
  }

  // If no categories are available, use placeholders
  const placeholderCategories: Category[] = [
    {
      id: 'higher-ed',
      name: 'Higher Education',
      slug: 'higher-education',
      description: 'News and resources related to universities and colleges',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f',
      articleCount: 24,
      createdAt: new Date()
    },
    {
      id: 'k12',
      name: 'K-12 Education',
      slug: 'k12',
      description: 'News and resources for primary and secondary education',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
      articleCount: 18,
      createdAt: new Date()
    },
    {
      id: 'edtech',
      name: 'Educational Technology',
      slug: 'edtech',
      description: 'The latest in education technology innovation',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      articleCount: 15,
      createdAt: new Date()
    },
    {
      id: 'policy',
      name: 'Education Policy',
      slug: 'policy',
      description: 'Analysis and updates on education policy and reform',
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
      articleCount: 12,
      createdAt: new Date()
    }
  ];

  const displayedCategories = categories.length > 0 ? categories : placeholderCategories;

  return (
    <div className="news-container">
      <h2 className="section-title">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayedCategories.map((category) => (
          <Link to={`/articles?category=${category.slug}`} key={category.id}>
            <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
              <div className="h-32 relative overflow-hidden">
                <img 
                  src={category.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                <div className="absolute bottom-0 left-0 p-3 w-full">
                  <h3 className="text-white font-semibold">{category.name}</h3>
                  <p className="text-white/80 text-xs">
                    {category.articleCount} articles
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
