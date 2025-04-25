
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Article } from '@/types';
import { getFeaturedArticles } from '@/services/articleService';
import { Calendar, Clock } from 'lucide-react';

const FeaturedArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getFeaturedArticles();
        setArticles(fetchedArticles);
      } catch (err) {
        console.error('Error fetching featured articles:', err);
        setError('Failed to load featured articles');
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="news-container">
        <h2 className="section-title">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <CardContent className="p-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-container">
        <h2 className="section-title">Featured Articles</h2>
        <div className="text-center p-8">
          <p className="text-destructive">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="news-container">
      <h2 className="section-title">Featured Articles</h2>
      {articles.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No featured articles available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link to={`/article/${article.slug}`} key={article.id}>
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold line-clamp-2 mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{article.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {article.createdAt instanceof Date
                          ? article.createdAt.toLocaleDateString()
                          : new Date(article.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-sm font-medium">By {article.author}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link to="/articles">View All Articles</Link>
        </Button>
      </div>
    </div>
  );
};

export default FeaturedArticles;
