
import { collection, query, where, orderBy, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Resource } from '../types';

const COLLECTION_NAME = 'resources';

export const getResources = async (): Promise<Resource[]> => {
  try {
    const resourcesQuery = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const snapshot = await getDocs(resourcesQuery);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        fileUrl: data.fileUrl,
        fileType: data.fileType,
        category: data.category,
        author: data.author,
        authorId: data.authorId,
        downloadCount: data.downloadCount,
        createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt.seconds * 1000),
      };
    });
  } catch (error) {
    console.error("Error fetching resources:", error);
    throw error;
  }
};

export const getResourceById = async (id: string): Promise<Resource> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title,
        description: data.description,
        fileUrl: data.fileUrl,
        fileType: data.fileType,
        category: data.category,
        author: data.author,
        authorId: data.authorId,
        downloadCount: data.downloadCount,
        createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt.seconds * 1000),
      };
    } else {
      throw new Error('Resource not found');
    }
  } catch (error) {
    console.error("Error fetching resource:", error);
    throw error;
  }
};

export const getResourcesByAuthor = async (authorId: string): Promise<Resource[]> => {
  try {
    const resourcesQuery = query(
      collection(db, COLLECTION_NAME),
      where('authorId', '==', authorId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(resourcesQuery);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        fileUrl: data.fileUrl,
        fileType: data.fileType,
        category: data.category,
        author: data.author,
        authorId: data.authorId,
        downloadCount: data.downloadCount,
        createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt.seconds * 1000),
      };
    });
  } catch (error) {
    console.error("Error fetching author resources:", error);
    throw error;
  }
};

export const createResource = async (resource: Omit<Resource, 'id' | 'createdAt'>): Promise<Resource> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...resource,
      createdAt: new Date(),
    });
    
    const newResource = await getResourceById(docRef.id);
    
    return newResource;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
};

export const updateResource = async (id: string, updates: Partial<Resource>): Promise<Resource> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
    
    const updatedResource = await getResourceById(id);
    
    return updatedResource;
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
};

export const deleteResource = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting resource:", error);
    throw error;
  }
};
