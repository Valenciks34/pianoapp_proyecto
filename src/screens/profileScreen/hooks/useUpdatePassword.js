import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useState } from "react";

import { auth } from "../../../../firebaseConfig";

export const useUpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const updateUserPassword = async (password, newPassword) => {
    setPasswordUpdated(false);
    setError(null);
    setIsLoading(true);

    try {
      const user = auth.currentUser;

      const credential = EmailAuthProvider.credential(user.email, password);

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      setPasswordUpdated(true);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, passwordUpdated, updateUserPassword };
};