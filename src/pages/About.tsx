
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          
          <div className="prose prose-lg">
            <p className="text-xl text-muted-foreground mb-8">
              Welcome to our educational platform where we share knowledge, insights, and resources
              to help you stay informed about the latest developments in education and technology.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="mb-6">
              Our mission is to provide high-quality, accessible educational content and resources
              to learners and educators worldwide. We believe in the power of knowledge sharing
              and continuous learning.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>In-depth articles on education and technology</li>
              <li>Latest news and updates in the education sector</li>
              <li>Resources for teachers and students</li>
              <li>Expert insights and analysis</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              Have questions or suggestions? We'd love to hear from you. Reach out to us at:{' '}
              <a href="mailto:contact@example.com" className="text-primary hover:underline">
                contact@example.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
