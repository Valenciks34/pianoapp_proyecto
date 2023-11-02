import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../../../firebaseConfig";

export const useGetSlides = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slides, setSlides] = useState(null);

  const getSlides = async (categoryId, lessonId) => {
    setError(null);
    setIsLoading(true);

    try {
      const snapshot = await getDocs(collection(db, "categories", categoryId, "lessons", lessonId, "slides"));
      const docs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      setSlides(docs);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, slides, getSlides };
};