import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { auth, db } from "../../../../firebaseConfig";
import { setUser } from "../../../store/slices/userSlice";

/* Con useQuery */
// const loginQuery = async (key, email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     throw error;
//   }
// }
//
// export const useLogin = (email, password) => {
//   return useQuery(['login', email, password], loginQuery, {enabled: false});
// }


/* Con Custom Hook */
export const useLogin = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const loginWithEmailAndPassword = async (email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);

      const userDoc = doc(db, "users", credential.user.uid);

      const snapshot = await getDoc(userDoc, user);

      const user = snapshot.data();

      dispatch(setUser(user));

      setData(user);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  }

  return {isLoading, error, data, loginWithEmailAndPassword};
}