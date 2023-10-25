import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { auth, db } from "../../../../firebaseConfig";
import { updateUser } from "../../../store/slices/userSlice";


export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userUpdated, setUserUpdated] = useState(false);

  const dispatch = useDispatch();

  const updateUserData = async (data) => {
    setUserUpdated(false);
    setError(null);
    setIsLoading(true);

    try {
      console.log('updating');

      const userRef = doc(db, "users", auth.currentUser.uid);
     
      await updateDoc(userRef, {...data});
     
      dispatch(updateUser(data));

      console.log('updated');

      setUserUpdated(true);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, userUpdated, updateUserData };
};