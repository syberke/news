
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Category } from '../types';

const COLLECTION_NAME = 'categories';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    } as Category));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate()
      } as Category;
    } else {
      throw new Error('Category not found');
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate()
      } as Category;
    } else {
      throw new Error('Category not found');
    }
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    throw error;
  }
};

export const createCategory = async (
  categoryData: Omit<Category, 'id' | 'createdAt' | 'articleCount'>,
  imageFile: File | null
): Promise<Category> => {
  try {
    let imageUrl = categoryData.imageUrl || '';
    
    if (imageFile) {
      const storageRef = ref(storage, `categories/${Date.now()}_${imageFile.name}`);
      const uploadTaskSnapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    }
    
    const timestamp = new Date();
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...categoryData,
      imageUrl,
      articleCount: 0,
      createdAt: timestamp
    });
    
    return {
      id: docRef.id,
      ...categoryData,
      imageUrl,
      articleCount: 0,
      createdAt: timestamp
    } as Category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (
  id: string,
  categoryData: Partial<Category>,
  imageFile: File | null
): Promise<Category> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Category not found');
    }
    
    let imageUrl = categoryData.imageUrl || docSnap.data().imageUrl;
    
    if (imageFile) {
      const storageRef = ref(storage, `categories/${Date.now()}_${imageFile.name}`);
      const uploadTaskSnapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(uploadTaskSnapshot.ref);
      categoryData.imageUrl = imageUrl;
    }
    
    await updateDoc(docRef, {
      ...categoryData
    });
    
    const updatedDoc = await getDoc(docRef);
    
    return {
      id: updatedDoc.id,
      ...updatedDoc.data(),
      createdAt: updatedDoc.data().createdAt.toDate()
    } as Category;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const updateCategoryArticleCount = async (categoryId: string, increment: number): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, categoryId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const currentCount = docSnap.data().articleCount || 0;
      await updateDoc(docRef, {
        articleCount: Math.max(0, currentCount + increment)
      });
    }
  } catch (error) {
    console.error("Error updating category article count:", error);
    throw error;
  }
};
