import { collection, query, where, orderBy, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, limit, startAfter } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Article } from '../types';
import { dummyArticles } from '../data/dummyArticles';

// Temporary implementation using dummy data
export const getArticles = async (): Promise<{ articles: Article[], lastVisible: null }> => {
  return { articles: dummyArticles, lastVisible: null };
};

export const getFeaturedArticles = async (): Promise<Article[]> => {
  return dummyArticles.filter(article => article.featured);
};

export const getArticleById = async (id: string): Promise<Article> => {
  const article = dummyArticles.find(a => a.id === id);
  if (!article) throw new Error('Article not found');
  return article;
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const article = dummyArticles.find(a => a.slug === slug);
  if (!article) throw new Error('Article not found');
  return article;
};

export const createArticle = async (
  articleData: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>,
  imageFile: File | null
): Promise<Article> => {
  try {
    let imageUrl = articleData.imageUrl || '';
    
    if (imageFile) {
      const storageRef = ref(storage, `articles/${Date.now()}_${imageFile.name}`);
      const uploadTaskSnapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    }
    
    const timestamp = new Date();
    
    const docRef = await addDoc(collection(db, 'articles'), {
      ...articleData,
      imageUrl,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    
    return {
      id: docRef.id,
      ...articleData,
      imageUrl,
      createdAt: timestamp,
      updatedAt: timestamp
    } as Article;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

export const updateArticle = async (
  id: string,
  articleData: Partial<Article>,
  imageFile: File | null
): Promise<Article> => {
  try {
    let imageUrl = articleData.imageUrl || '';
    
    if (imageFile) {
      const storageRef = ref(storage, `articles/${Date.now()}_${imageFile.name}`);
      const uploadTaskSnapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(uploadTaskSnapshot.ref);
      articleData.imageUrl = imageUrl;
    }
    
    const timestamp = new Date();
    const docRef = doc(db, 'articles', id);
    
    await updateDoc(docRef, {
      ...articleData,
      updatedAt: timestamp
    });
    
    const updatedDoc = await getDoc(docRef);
    const data = updatedDoc.data();
    
    return {
      id: updatedDoc.id,
      ...data,
      createdAt: data?.createdAt.toDate(),
      updatedAt: timestamp
    } as Article;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export const deleteArticle = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'articles', id));
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};

export const getArticlesByAuthor = async (authorId: string): Promise<Article[]> => {
  try {
    const articlesQuery = query(
      collection(db, 'articles'),
      where('authorId', '==', authorId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(articlesQuery);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as Article;
    });
  } catch (error) {
    console.error("Error fetching articles by author:", error);
    throw error;
  }
};
