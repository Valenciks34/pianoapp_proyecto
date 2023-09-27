import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { Audio } from 'expo-av';


const WhiteKey = ({note}) => {


    const [sound, setSound] = React.useState();

    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(note);
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync();
    }
  
    React.useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);

    return(
        <TouchableOpacity onPress={playSound}>
            <View style={styles.whiteKey}>
                <Text>Note</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    whiteKey:{
        width:50,
        height:250,
        backgroundColor:"#FFF",
        borderRadius:4,
        borderWidth: 1, // Ancho del borde
        borderColor: 'black', // Color del borde (negro)
        
    }
})

export default WhiteKey;