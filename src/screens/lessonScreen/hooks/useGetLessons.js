import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../../../firebaseConfig";

export const useGetLessons = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lessons, setLessons] = useState(null);

  const getLessons = async (categoryId) => {
    setError(null);
    setIsLoading(true);

    try {
      const snapshot = await getDocs(collection(db, "categories", categoryId, "lessons"));
      const docs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      setLessons(docs);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, lessons, getLessons };
};