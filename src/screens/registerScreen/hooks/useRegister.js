import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { auth, db } from "../../../../firebaseConfig";
import { setUser } from "../../../store/slices/userSlice";

// Con Custom Hook
export const useRegister = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const registerWithEmailAndPassword = async (email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);

      const userDoc = doc(db, "users", credential.user.uid);

      const user = {email};

      await setDoc(userDoc, user);
      
      dispatch(setUser(user));

      setData(user);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return {isLoading, error, data, registerWithEmailAndPassword};
};