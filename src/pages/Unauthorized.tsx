
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-xl text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild>
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
