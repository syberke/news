
import { collection, query, where, orderBy, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Comment } from '../types';

const COLLECTION_NAME = 'comments';

export const getCommentsByArticle = async (articleId: string): Promise<Comment[]> => {
  try {
    const commentsQuery = query(
      collection(db, COLLECTION_NAME),
      where('articleId', '==', articleId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(commentsQuery);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as Comment;
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const getCommentById = async (id: string): Promise<Comment> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as Comment;
    } else {
      throw new Error('Comment not found');
    }
  } catch (error) {
    console.error("Error fetching comment:", error);
    throw error;
  }
};

export const createComment = async (commentData: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comment> => {
  try {
    const timestamp = new Date();
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...commentData,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    
    return {
      id: docRef.id,
      ...commentData,
      createdAt: timestamp,
      updatedAt: timestamp
    } as Comment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const updateComment = async (id: string, content: string): Promise<Comment> => {
  try {
    const timestamp = new Date();
    const docRef = doc(db, COLLECTION_NAME, id);
    
    await updateDoc(docRef, {
      content,
      updatedAt: timestamp
    });
    
    const updatedDoc = await getDoc(docRef);
    const data = updatedDoc.data();
    
    return {
      id: updatedDoc.id,
      ...data,
      createdAt: data?.createdAt.toDate(),
      updatedAt: timestamp
    } as Comment;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const getCommentsByUser = async (userId: string): Promise<Comment[]> => {
  try {
    const commentsQuery = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(commentsQuery);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as Comment;
    });
  } catch (error) {
    console.error("Error fetching comments by user:", error);
    throw error;
  }
};
