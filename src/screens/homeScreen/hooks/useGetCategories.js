import { useState } from "react";
import { collection, getDocs, orderBy, query as getQuery } from "firebase/firestore";

import { db } from "../../../../firebaseConfig";


export const useGetCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(null);

  const getCategories = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const categoriesRef = collection(db, "categories");
      const query = getQuery(categoriesRef, orderBy("order"));
      const snapshot = await getDocs(query);
      const docs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      setCategories(docs);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
    
  };

  return { isLoading, error, categories, getCategories };
};