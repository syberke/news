
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { getCategoryBySlug } from '@/services/categoryService';
import { getArticles } from '@/services/articleService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CategoryDetails = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => getCategoryBySlug(slug || ''),
    enabled: !!slug,
  });

  const { data: articlesData } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  const categoryArticles = articlesData?.articles.filter(article => article.category === category?.name) || [];

  if (categoryLoading) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!category) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Category not found</h1>
          <Link to="/categories" className="text-primary hover:underline">
            Back to categories
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-64 rounded-lg overflow-hidden mb-6">
            <img 
              src={category.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} 
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-muted-foreground mb-4">{category.description}</p>
          <p className="text-sm text-muted-foreground">{category.articleCount} articles in this category</p>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Articles in {category.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticles.map((article) => (
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
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h3>
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

        {categoryArticles.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No articles found in this category.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CategoryDetails;
