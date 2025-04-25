
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EduNewsHub</h3>
            <p className="text-sm opacity-80 mb-4">
              Providing quality educational news and resources for students, educators, and lifelong learners.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm opacity-80 hover:opacity-100 hover:underline">Home</Link></li>
              <li><Link to="/articles" className="text-sm opacity-80 hover:opacity-100 hover:underline">Articles</Link></li>
              <li><Link to="/categories" className="text-sm opacity-80 hover:opacity-100 hover:underline">Categories</Link></li>
              <li><Link to="/about" className="text-sm opacity-80 hover:opacity-100 hover:underline">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/articles?category=higher-education" className="text-sm opacity-80 hover:opacity-100 hover:underline">Higher Education</Link></li>
              <li><Link to="/articles?category=k12" className="text-sm opacity-80 hover:opacity-100 hover:underline">K-12 Education</Link></li>
              <li><Link to="/articles?category=edtech" className="text-sm opacity-80 hover:opacity-100 hover:underline">Educational Technology</Link></li>
              <li><Link to="/articles?category=policy" className="text-sm opacity-80 hover:opacity-100 hover:underline">Education Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm opacity-80">Email: info@edunewshub.com</li>
              <li className="text-sm opacity-80">Phone: +1 (555) 123-4567</li>
              <li className="text-sm opacity-80">Address: 123 Education St, Learning City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80">&copy; {new Date().getFullYear()} EduNewsHub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm opacity-80 hover:opacity-100 hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="text-sm opacity-80 hover:opacity-100 hover:underline">Terms of Service</Link>
              <Link to="/contact" className="text-sm opacity-80 hover:opacity-100 hover:underline">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
