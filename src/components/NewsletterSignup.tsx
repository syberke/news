
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Mail } from 'lucide-react';
import { subscribeToNewsletter } from '@/services/newsletterService';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    
    setLoading(true);
    try {
      await subscribeToNewsletter(email, name);
      toast({
        title: "Subscribed Successfully!",
        description: "You have been subscribed to our newsletter.",
      });
      setEmail('');
      setName('');
    } catch (error) {
      console.error('Failed to subscribe:', error);
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary/10 py-12 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="flex justify-center mb-4">
          <Mail className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
        <p className="text-muted-foreground mb-6">
          Get the latest educational news, resources, and updates delivered directly to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-background"
            />
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="mr-2">Subscribing...</span>
                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>
        </form>
        
        <p className="text-xs text-muted-foreground mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
