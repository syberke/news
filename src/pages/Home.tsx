
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturedArticles from '../components/FeaturedArticles';
import CategoriesSection from '../components/CategoriesSection';
import NewsletterSignup from '../components/NewsletterSignup';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <div className="py-12 bg-background">
          <FeaturedArticles />
        </div>
        <div className="py-12 bg-muted/50">
          <CategoriesSection />
        </div>
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
};

export default Home;
