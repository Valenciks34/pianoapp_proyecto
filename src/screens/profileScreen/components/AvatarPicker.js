import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native'


export default function AvatarPicker({image, text, size, backgroundColor}) {
  return (

    <View style={{width: size, height: size, borderRadius: size/2, backgroundColor, overflow:"hidden"}}>
      {image 
        ? <Image source={{uri: image}} style={{width: "100%", height: "100%"}} resizeMode='cover' />
        : <View style={styles.fitAbsolute}>
            <Text 
              style={{fontSize: size, color: "white"}} 
              numberOfLines={1} 
              adjustsFontSizeToFit={true}
            >
              {text[0].toUpperCase()}
            </Text>
          </View>
      }
    </View>
  )
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
})
