import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "../../../../firebaseConfig";

export const useRestorePassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const restorePassword = async (email) => {
    setError(null);
    setIsLoading(true);
    setEmailSent(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      setError(error);      
    } finally {
      setIsLoading(false);
    }
  };

  return {isLoading, error, emailSent, restorePassword};
};