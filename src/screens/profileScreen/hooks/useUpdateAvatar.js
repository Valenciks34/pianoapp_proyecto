import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

import { auth, db, storage } from "../../../../firebaseConfig";
import { getImageExtension, uriToBlob } from "../../../utils";
import { updateUser } from "../../../store/slices/userSlice";

export const useUpdateAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const dispatch = useDispatch();

  const updateAvatar = async (image) => {
    setError(null);
    setIsLoading(true);

    try {
      // Obtenemos y extension del archivo
      const extension = getImageExtension(image);
      const imgName = `${auth.currentUser.uid}.${extension}`;

      // Subimos al storage
      const userStorageRef = ref(storage, imgName);
      const blob = await uriToBlob(image);
      await uploadBytes(userStorageRef, blob, { contentType: "image/jpeg" });
      const avatarUrl = await getDownloadURL(userStorageRef);
      
      // Actualizamos documento en firestore  
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {avatar: avatarUrl});

      dispatch(updateUser({avatar: avatarUrl}));
      
      setUploadedImage(avatarUrl);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, uploadedImage, updateAvatar };
};