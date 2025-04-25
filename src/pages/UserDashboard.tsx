
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Article, Comment, Resource } from '@/types';
import { getArticlesByAuthor } from '@/services/articleService';
import { getCommentsByUser } from '@/services/commentService';
import { getResourcesByAuthor } from '@/services/resourceService';
import { Calendar, Clock, Bookmark, MessageSquare, FileText, Plus } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch user-related data
        const [userArticles, userComments, userResources] = await Promise.all([
          getArticlesByAuthor(currentUser.uid),
          getCommentsByUser(currentUser.uid),
          getResourcesByAuthor(currentUser.uid)
        ]);
        
        setArticles(userArticles);
        setComments(userComments);
        setResources(userResources);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [currentUser, navigate]);
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {currentUser?.displayName || 'User'}
          </p>
        </div>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="articles">My Articles</TabsTrigger>
            <TabsTrigger value="comments">My Comments</TabsTrigger>
            <TabsTrigger value="resources">My Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">My Articles</CardTitle>
                  <CardDescription>Articles you've published</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{articles.length}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link to="/dashboard?tab=articles">View All Articles</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">My Comments</CardTitle>
                  <CardDescription>Comments you've posted</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{comments.length}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link to="/dashboard?tab=comments">View All Comments</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">My Resources</CardTitle>
                  <CardDescription>Resources you've uploaded</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{resources.length}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link to="/dashboard?tab=resources">View All Resources</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest posts and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[...articles.slice(0, 2), ...comments.slice(0, 2), ...resources.slice(0, 1)]
                      .sort((a, b) => {
                        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
                        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
                        return dateB.getTime() - dateA.getTime();
                      })
                      .slice(0, 5)
                      .map((item, index) => {
                        if ('title' in item && 'content' in item) {
                          // This is an article
                          return (
                            <div key={`article-${item.id}`} className="flex items-start space-x-4">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <FileText className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">You published an article</p>
                                <Link to={`/article/${item.slug}`} className="text-sm text-muted-foreground hover:text-primary">
                                  {item.title}
                                </Link>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.createdAt instanceof Date
                                    ? item.createdAt.toLocaleDateString()
                                    : new Date(item.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          );
                        } else if ('articleId' in item) {
                          // This is a comment
                          return (
                            <div key={`comment-${item.id}`} className="flex items-start space-x-4">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <MessageSquare className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">You commented on an article</p>
                                <Link to={`/article/${item.articleId}`} className="text-sm text-muted-foreground hover:text-primary">
                                  {item.content.substring(0, 50)}...
                                </Link>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.createdAt instanceof Date
                                    ? item.createdAt.toLocaleDateString()
                                    : new Date(item.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          );
                        } else if ('fileUrl' in item) {
                          // This is a resource
                          return (
                            <div key={`resource-${item.id}`} className="flex items-start space-x-4">
                              <div className="bg-primary/10 p-2 rounded-full">
                                <Bookmark className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">You uploaded a resource</p>
                                <Link to={`/resource/${item.id}`} className="text-sm text-muted-foreground hover:text-primary">
                                  {item.title}
                                </Link>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.createdAt instanceof Date
                                    ? item.createdAt.toLocaleDateString()
                                    : new Date(item.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                      
                    {articles.length === 0 && comments.length === 0 && resources.length === 0 && !loading && (
                      <p className="text-center py-6 text-muted-foreground">No recent activity found.</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="articles" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Articles</h2>
              <Button asChild>
                <Link to="/article/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Article
                </Link>
              </Button>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-40 bg-gray-200 animate-pulse"></div>
                    <CardContent className="p-4">
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {articles.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-8">
                      <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
                      <p className="text-muted-foreground text-center mb-6">You haven't published any articles yet.</p>
                      <Button asChild>
                        <Link to="/article/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Article
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map((article) => (
                      <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={article.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} 
                            alt={article.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary">
                              {article.category}
                            </span>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{article.readTime} min read</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.summary}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>
                                {article.createdAt instanceof Date
                                  ? article.createdAt.toLocaleDateString()
                                  : new Date(article.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div>
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/article/${article.slug}`}>View</Link>
                              </Button>
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/article/edit/${article.id}`}>Edit</Link>
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
          
          <TabsContent value="comments">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">My Comments</h2>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="h-6 w-40 bg-gray-200 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {comments.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-8">
                      <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Comments Found</h3>
                      <p className="text-muted-foreground text-center mb-6">You haven't posted any comments yet.</p>
                      <Button asChild>
                        <Link to="/articles">
                          Browse Articles
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <Card key={comment.id}>
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <Link 
                              to={`/article/${comment.articleId}`}
                              className="text-lg font-medium hover:text-primary transition-colors"
                            >
                              Article: #{comment.articleId.substring(0, 8)}...
                            </Link>
                            <div className="text-xs text-muted-foreground">
                              {comment.createdAt instanceof Date
                                ? comment.createdAt.toLocaleDateString()
                                : new Date(comment.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4">{comment.content}</p>
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">Delete</Button>
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
              <h2 className="text-2xl font-bold">My Resources</h2>
              <Button asChild>
                <Link to="/resource/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Resource
                </Link>
              </Button>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="h-6 w-40 bg-gray-200 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {resources.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-8">
                      <Bookmark className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
                      <p className="text-muted-foreground text-center mb-6">You haven't uploaded any resources yet.</p>
                      <Button asChild>
                        <Link to="/resource/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Upload Your First Resource
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {resources.map((resource) => (
                      <Card key={resource.id}>
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">{resource.title}</h3>
                            <span className="text-xs px-2 py-1 bg-primary/10 rounded text-primary">
                              {resource.category}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-4">{resource.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>
                                {resource.createdAt instanceof Date
                                  ? resource.createdAt.toLocaleDateString()
                                  : new Date(resource.createdAt).toLocaleDateString()}
                              </span>
                              <span className="mx-2">•</span>
                              <span>{resource.downloadCount} downloads</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button asChild variant="ghost" size="sm">
                                <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                                  Download
                                </a>
                              </Button>
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/resource/edit/${resource.id}`}>
                                  Edit
                                </Link>
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
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
