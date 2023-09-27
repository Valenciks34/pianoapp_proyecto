import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

const BlackKey = ({note}) => {

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
            <View style={styles.blacKey} >
                <Text>Note</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    blacKey:{
        width:40,
        height:100,
        backgroundColor:"#011",  
        borderWidth: 1, // Ancho del borde
        borderColor: '#fff', // Color del borde (negro)
        borderRadius:4,
        marginLeft: -30,
        marginRight: -30,
        position:"absolute"        
    }
})

export default BlackKey;