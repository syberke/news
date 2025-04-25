
import { collection, query, where, orderBy, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Newsletter } from '@/types';

const COLLECTION_NAME = 'newsletter';

// Get all newsletter subscribers
export const getNewsletterSubscribers = async (): Promise<Newsletter[]> => {
  try {
    const subscribersQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy('subscribedAt', 'desc')
    );
    
    const snapshot = await getDocs(subscribersQuery);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        subscribedAt: data.subscribedAt instanceof Date ? 
          data.subscribedAt : 
          data.subscribedAt && 'seconds' in data.subscribedAt ? 
            new Date(data.subscribedAt.seconds * 1000) : 
            new Date(),
        categories: data.categories || [],
        active: data.active,
      };
    });
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    throw error;
  }
};

// Get a newsletter subscriber by ID
export const getNewsletterSubscriberById = async (id: string): Promise<Newsletter> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name,
        email: data.email,
        subscribedAt: data.subscribedAt instanceof Date ? 
          data.subscribedAt : 
          data.subscribedAt && 'seconds' in data.subscribedAt ? 
            new Date(data.subscribedAt.seconds * 1000) : 
            new Date(),
        categories: data.categories || [],
        active: data.active,
      };
    } else {
      throw new Error('Newsletter subscriber not found');
    }
  } catch (error) {
    console.error("Error fetching newsletter subscriber:", error);
    throw error;
  }
};

// Get newsletter subscribers by email
export const getNewsletterSubscriberByEmail = async (email: string): Promise<Newsletter | null> => {
  try {
    const subscribersQuery = query(
      collection(db, COLLECTION_NAME),
      where('email', '==', email),
      limit(1)
    );
    
    const snapshot = await getDocs(subscribersQuery);
    
    if (snapshot.empty) {
      return null;
    }
    
    const doc = snapshot.docs[0];
    const data = doc.data();
    
    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      subscribedAt: data.subscribedAt instanceof Date ? 
        data.subscribedAt : 
        data.subscribedAt && 'seconds' in data.subscribedAt ? 
          new Date(data.subscribedAt.seconds * 1000) : 
          new Date(),
      categories: data.categories || [],
      active: data.active,
    };
  } catch (error) {
    console.error("Error fetching newsletter subscriber by email:", error);
    throw error;
  }
};

// Create a new newsletter subscriber
export const createNewsletterSubscriber = async (subscriber: Omit<Newsletter, 'id' | 'subscribedAt'>): Promise<Newsletter> => {
  try {
    // Check if email already exists
    const existingSubscriber = await getNewsletterSubscriberByEmail(subscriber.email);
    
    if (existingSubscriber) {
      throw new Error('Email is already subscribed to the newsletter');
    }
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...subscriber,
      subscribedAt: new Date(),
    });
    
    const newSubscriber = await getNewsletterSubscriberById(docRef.id);
    
    return newSubscriber;
  } catch (error) {
    console.error("Error creating newsletter subscriber:", error);
    throw error;
  }
};

// Update a newsletter subscriber
export const updateNewsletterSubscriber = async (id: string, updates: Partial<Newsletter>): Promise<Newsletter> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
    
    const updatedSubscriber = await getNewsletterSubscriberById(id);
    
    return updatedSubscriber;
  } catch (error) {
    console.error("Error updating newsletter subscriber:", error);
    throw error;
  }
};

// Delete a newsletter subscriber
export const deleteNewsletterSubscriber = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting newsletter subscriber:", error);
    throw error;
  }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (email: string, name: string): Promise<Newsletter> => {
  return await createNewsletterSubscriber({
    email,
    name,
    categories: [],
    active: true
  });
};

// Import necessary functions
import { limit } from 'firebase/firestore';
