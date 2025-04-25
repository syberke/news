
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { getCategories } from '@/services/categoryService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

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
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <Link to={`/category/${category.slug}`} key={category.id}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video relative">
                  <img 
                    src={category.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-4">
                    <h2 className="text-xl font-semibold text-white mb-1">{category.name}</h2>
                    <p className="text-white/80 text-sm">{category.articleCount} articles</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Categories;
