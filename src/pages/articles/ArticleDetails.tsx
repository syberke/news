
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@/types';
import { getArticleBySlug } from '@/services/articleService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ArticleDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: ['article', slug],
    queryFn: () => getArticleBySlug(slug || ''),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to articles
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{article.title}</CardTitle>
            <div className="flex items-center space-x-4 text-muted-foreground">
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
          </CardHeader>
          <CardContent>
            {article.imageUrl && (
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-2">Author</h3>
              <p>{article.author}</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default ArticleDetails;
