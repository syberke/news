
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={currentUser?.photoURL || ''} />
                <AvatarFallback>{currentUser?.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{currentUser?.displayName || 'User'}</h2>
                <p className="text-muted-foreground">{currentUser?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
