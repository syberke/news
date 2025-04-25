
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-secondary py-16 px-4 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-foreground leading-tight">
              The Latest in <span className="text-accent">Education News</span> and Resources
            </h1>
            <p className="text-lg text-secondary-foreground/90 leading-relaxed">
              Stay informed with the latest trends, research, and insights in education. 
              Browse our comprehensive collection of articles and resources for educators, 
              students, and education enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-medium">
                <Link to="/articles">
                  Explore Articles
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium bg-secondary-foreground/10">
                <Link to="/resources">
                  Browse Resources
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-primary/20 rounded-full absolute -left-5 -top-5"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 bg-accent/20 rounded-full absolute -right-5 -bottom-5"></div>
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                alt="Educational News" 
                className="rounded-xl relative z-10 w-full h-auto max-w-md object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
