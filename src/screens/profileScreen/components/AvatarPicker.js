import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useImagePicker, useUpdateAvatar } from "../hooks";
import { ActivityIndicator, IconButton, Portal, Snackbar, useTheme } from "react-native-paper";

export default function AvatarPicker({userAvatar, text, size}) {
  const { isLoading, error, uploadedImage, updateAvatar } = useUpdateAvatar();
  const { pickedImage, pickImage } = useImagePicker();

  const [image, setImage] = useState(userAvatar);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const { colors } = useTheme();

  useEffect(() => {
    if(pickedImage) {
      setImage(pickedImage);
    }
  }, [pickedImage]);

  useEffect(() => {
    if(uploadedImage || error) {
      if(uploadedImage) {
        setImage(uploadedImage);
      }

      setShowSnackbar(true);
    }
  }, [uploadedImage, error]);

  const letters = () => {
    const split = text.split(" ");

    if(split.length > 1) {
      const letters = `${split[0][0]}${split[1][0]}`;
      return `${letters.toUpperCase()}`;
    } else {
      const letters = text.substring(0,2);
      return `${letters.toUpperCase()}`;
    }
  };

  const buttonRadius = 25;

  console.log(text);

  return (
    <TouchableOpacity onPress={pickImage}>
      <View style={{width: size, height: size}}>
        {(image)
          ? <Image 
            source={{uri: image}} 
            onError={(_) => setImage(null)}
            style={{width: "100%", height: "100%", borderRadius: size/2}} 
            resizeMode='cover' 
          />
          : <View style={{...styles.fitAbsolute, borderRadius: size/2, backgroundColor: colors.primary}}>
            <Text 
              style={{fontSize: size, color: "white", padding: 10.0}} 
              numberOfLines={1} 
              adjustsFontSizeToFit={true}
            >
              {letters()}
            </Text>
          </View>
        }

        <View style={{position: "absolute", right: -buttonRadius/2, bottom: -buttonRadius/2}}>
          { isLoading
            ? <View style={{
              width: buttonRadius * 1.5, 
              height: buttonRadius * 1.5,  
              borderRadius: buttonRadius,
              backgroundColor: colors.surfaceVariant,
              justifyContent: "center"
            }}>
              <ActivityIndicator />
            </View>
            : pickedImage !== null
              ? <IconButton
                icon="check"
                size={buttonRadius}
                mode="contained"
                onPress={() => updateAvatar(pickedImage)}
              />
              : image !== null
                ? <IconButton
                  icon="delete"
                  size={buttonRadius}
                  mode="contained"
                  onPress={() => setImage(null)}
                />
                : <IconButton
                  icon="camera"
                  size={buttonRadius}
                  mode="contained"
                  onPress={pickImage}
                />
          }
        </View>

        <Portal>
          <Snackbar
            visible={showSnackbar}
            onDismiss={() => setShowSnackbar(false)}
            action={{label: "close"}}
          >
            { error
              ? error.toString()
              : "Image uploaded successfully"
            }
          </Snackbar>
        </Portal> 
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
  },

  textContainer: {
    flex:1,
    alignItems:"center"
  },

  fitAbsolute: {
    position:"absolute", 
    top: -5,
    left: 8, 
    right: 0, 
    bottom: 5,
    alignItems:"center", 
    justifyContent:"center"
  }
});
