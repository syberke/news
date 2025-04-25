import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Article, Category, Newsletter, Resource } from '@/types';
import { 
  getArticles, 
  getFeaturedArticles,
  deleteArticle 
} from '@/services/articleService';
import { 
  getCategories, 
  deleteCategory 
} from '@/services/categoryService';
import {
  getResources,
  deleteResource
} from '@/services/resourceService';
import { 
  getNewsletterSubscribers,
  deleteNewsletterSubscriber 
} from '@/services/newsletterService';
import { useToast } from '@/components/ui/use-toast';
import { 
  BarChart, 
  Calendar, 
  Edit, 
  FileText, 
  Grid2X2, 
  LayoutDashboard, 
  Mail, 
  Plus, 
  Search, 
  Trash, 
  Users 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [subscribers, setSubscribers] = useState<Newsletter[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (userRole !== 'admin') {
      navigate('/unauthorized');
      return;
    }
    
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const [
          articlesData, 
          categoriesData, 
          resourcesData, 
          subscribersData,
          featuredArticlesData
        ] = await Promise.all([
          getArticles().then((res) => res.articles),
          getCategories(),
          getResources(),
          getNewsletterSubscribers(),
          getFeaturedArticles()
        ]);
        
        setArticles(articlesData);
        setCategories(categoriesData);
        setResources(resourcesData);
        setSubscribers(subscribersData);
        setFeaturedArticles(featuredArticlesData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminData();
  }, [currentUser, userRole, navigate, toast]);

  const handleDeleteArticle = async (articleId: string) => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      try {
        await deleteArticle(articleId);
        setArticles(articles.filter(article => article.id !== articleId));
        toast({
          title: "Success",
          description: "Article deleted successfully.",
        });
      } catch (error) {
        console.error('Error deleting article:', error);
        toast({
          title: "Error",
          description: "Failed to delete article. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await deleteCategory(categoryId);
        setCategories(categories.filter(category => category.id !== categoryId));
        toast({
          title: "Success",
          description: "Category deleted successfully.",
        });
      } catch (error) {
        console.error('Error deleting category:', error);
        toast({
          title: "Error",
          description: "Failed to delete category. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    if (window.confirm('Are you sure you want to delete this resource? This action cannot be undone.')) {
      try {
        await deleteResource(resourceId);
        setResources(resources.filter(resource => resource.id !== resourceId));
        toast({
          title: "Success",
          description: "Resource deleted successfully.",
        });
      } catch (error) {
        console.error('Error deleting resource:', error);
        toast({
          title: "Error",
          description: "Failed to delete resource. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteSubscriber = async (subscriberId: string) => {
    if (window.confirm('Are you sure you want to delete this subscriber? This action cannot be undone.')) {
      try {
        await deleteNewsletterSubscriber(subscriberId);
        setSubscribers(subscribers.filter(subscriber => subscriber.id !== subscriberId));
        toast({
          title: "Success",
          description: "Subscriber deleted successfully.",
        });
      } catch (error) {
        console.error('Error deleting subscriber:', error);
        toast({
          title: "Error",
          description: "Failed to delete subscriber. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your educational news platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Articles
              </CardTitle>
              <CardDescription>Total articles published</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : articles.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Grid2X2 className="mr-2 h-5 w-5 text-primary" />
                Categories
              </CardTitle>
              <CardDescription>Content categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : categories.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-primary" />
                Resources
              </CardTitle>
              <CardDescription>Educational resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : resources.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Subscribers
              </CardTitle>
              <CardDescription>Newsletter subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{loading ? '...' : subscribers.length}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="articles" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview" className="flex items-center">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center">
              <Grid2X2 className="h-4 w-4 mr-2" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Newsletter
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Overview</CardTitle>
                <CardDescription>Summary of your educational news platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Featured Articles</h3>
                    {loading ? (
                      <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {featuredArticles.length === 0 ? (
                          <p className="text-muted-foreground">No featured articles yet.</p>
                        ) : (
                          featuredArticles.map((article) => (
                            <div key={article.id} className="flex justify-between items-center">
                              <div>
                                <Link to={`/article/${article.slug}`} className="font-medium hover:text-primary">
                                  {article.title}
                                </Link>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>
                                    {article.createdAt instanceof Date
                                      ? article.createdAt.toLocaleDateString()
                                      : new Date(article.createdAt).toLocaleDateString()}
                                  </span>
                                  <span className="mx-1">•</span>
                                  <span>{article.category}</span>
                                </div>
                              </div>
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/article/edit/${article.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Recent Categories</h3>
                    {loading ? (
                      <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {categories.length === 0 ? (
                          <p className="text-muted-foreground">No categories yet.</p>
                        ) : (
                          categories.slice(0, 5).map((category) => (
                            <div key={category.id} className="flex justify-between items-center">
                              <div>
                                <span className="font-medium">{category.name}</span>
                                <div className="text-xs text-muted-foreground">
                                  {category.articleCount} articles
                                </div>
                              </div>
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/category/edit/${category.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Newsletter Subscribers</h3>
                    {loading ? (
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <div>
                        <p className="text-3xl font-bold">{subscribers.length}</p>
                        <p className="text-muted-foreground text-sm">
                          Total active subscribers to your newsletter
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="articles">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Articles Management</h2>
              <Button asChild>
                <Link to="/article/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Article
                </Link>
              </Button>
            </div>
            
            <div className="mb-4">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
                adornment={<Search className="h-4 w-4 absolute top-3 left-3 text-muted-foreground" />}
              />
            </div>
            
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <>
                {articles.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-medium mb-2">No Articles Found</h3>
                      <p className="text-muted-foreground mb-6">
                        Start creating content for your educational news platform.
                      </p>
                      <Button asChild>
                        <Link to="/article/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Create First Article
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {articles
                      .filter(article => 
                        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.category.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((article) => (
                        <Card key={article.id} className="hover:bg-muted/30 transition-colors">
                          <CardContent className="p-4 flex justify-between items-center">
                            <div>
                              <Link to={`/article/${article.slug}`} className="font-medium hover:text-primary">
                                {article.title}
                              </Link>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span>{article.category}</span>
                                <span className="mx-1">•</span>
                                <span>By {article.author}</span>
                                <span className="mx-1">•</span>
                                <Calendar className="h-3 w-3 mx-1" />
                                <span>
                                  {article.createdAt instanceof Date
                                    ? article.createdAt.toLocaleDateString()
                                    : new Date(article.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/article/${article.slug}`}>
                                  View
                                </Link>
                              </Button>
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/article/edit/${article.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteArticle(article.id)}>
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Categories Management</h2>
              <Button asChild>
                <Link to="/category/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Category
                </Link>
              </Button>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <>
                {categories.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Grid2X2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-medium mb-2">No Categories Found</h3>
                      <p className="text-muted-foreground mb-6">
                        Create categories to organize your educational content.
                      </p>
                      <Button asChild>
                        <Link to="/category/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Create First Category
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category) => (
                      <Card key={category.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-32 relative">
                          <img 
                            src={category.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} 
                            alt={category.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                          <div className="absolute bottom-0 left-0 p-3 w-full">
                            <h3 className="text-white font-semibold">{category.name}</h3>
                            <p className="text-white/80 text-xs">
                              {category.articleCount} articles
                            </p>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {category.description || "No description provided."}
                          </p>
                          <div className="flex justify-end space-x-2">
                            <Button asChild variant="ghost" size="sm">
                              <Link to={`/category/edit/${category.id}`}>
                                  <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Resources Management</h2>
              <Button asChild>
                <Link to="/resource/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Resource
                </Link>
              </Button>
            </div>
            
            {loading ? (
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <>
                {resources.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <BarChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-medium mb-2">No Resources Found</h3>
                      <p className="text-muted-foreground mb-6">
                        Upload educational resources for your users.
                      </p>
                      <Button asChild>
                        <Link to="/resource/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Upload First Resource
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {resources.map((resource) => (
                      <Card key={resource.id} className="hover:bg-muted/30 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{resource.title}</h3>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span>{resource.category}</span>
                                <span className="mx-1">•</span>
                                <span>By {resource.author}</span>
                                <span className="mx-1">•</span>
                                <Calendar className="h-3 w-3 mx-1" />
                                <span>
                                  {resource.createdAt instanceof Date
                                    ? resource.createdAt.toLocaleDateString()
                                    : new Date(resource.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button asChild variant="ghost" size="sm">
                                <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                                  Download
                                </a>
                              </Button>
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/resource/edit/${resource.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteResource(resource.id)}>
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="newsletter">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Newsletter Subscribers</h2>
            </div>
            
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <>
                {subscribers.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-medium mb-2">No Subscribers Found</h3>
                      <p className="text-muted-foreground mb-6">
                        Encourage users to subscribe to your educational newsletter.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {subscribers.map((subscriber) => (
                      <Card key={subscriber.id} className="hover:bg-muted/30 transition-colors">
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <div className="font-medium">{subscriber.name}</div>
                            <div className="text-sm text-muted-foreground">{subscriber.email}</div>
                          </div>
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${subscriber.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {subscriber.active ? 'Active' : 'Inactive'}
                            </span>
                            <Button variant="ghost" size="sm" className="ml-2" onClick={() => handleDeleteSubscriber(subscriber.id)}>
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
