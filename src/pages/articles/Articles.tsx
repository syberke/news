
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { getArticles } from '@/services/articleService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Articles = () => {
  const { data: articlesData, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  const articles = articlesData?.articles || [];

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link to={`/article/${article.slug}`} key={article.id}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={article.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
                  <p className="text-muted-foreground line-clamp-2 mb-4">{article.summary}</p>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {article.createdAt instanceof Date
                          ? article.createdAt.toLocaleDateString()
                          : new Date(article.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Articles;
