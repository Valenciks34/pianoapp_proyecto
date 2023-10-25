import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export const useImagePicker = () => {
  const [pickedImage, setPickedImage] = useState(null);
  const [isCancelled, setCancelled] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(result.canceled) {
      setCancelled(true);
      return;
    }

    setPickedImage(result.assets[0].uri);
  };

  return { pickedImage, isCancelled, pickImage };
};