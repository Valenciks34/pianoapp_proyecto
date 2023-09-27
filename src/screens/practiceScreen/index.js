import { Text, View, StyleSheet} from 'react-native'
import React from 'react'

import WhiteKey from './whiteKey'
import BlackKey from './blackKey'

const PracticeScreen = ({navigation}) => {

    return (

            //   <View style={styles.container}>
            //     <View style={styles.piano}>
            //       <View style={styles.whiteKey}></View>
            //       <View style={styles.blackKey}></View>
            //       <View style={styles.whiteKey}></View>
            //       <View style={styles.blackKey}></View>
            //       <View style={styles.whiteKey}></View>
            //       <View style={styles.whiteKey}></View>
            //       <View style={styles.blackKey}></View>
            //       <View style={styles.whiteKey}></View>
            //       <View style={styles.blackKey}></View>
            //       <View style={styles.whiteKey}></View>
            //       <View style={styles.blackKey}></View>
            //       <View style={styles.whiteKey}></View>
            //     </View>
            //   </View>
         
          

        <View style = {{display:"flex",justifyContent:'center', alignItems:'center', flex:1, backgroundColor:"#199"}}>
            <View style = {{display:"flex", flexDirection:"row"}}>
                <WhiteKey note = {require("./assets/do.mp3")}></WhiteKey>
                <BlackKey ></BlackKey>
                <WhiteKey note = {require("./assets/re.mp3")}></WhiteKey>
                <BlackKey ></BlackKey>
                <WhiteKey note = {require("./assets/mi.mp3")}></WhiteKey>
                <WhiteKey note = {require("./assets/fa.mp3")}></WhiteKey>
                <BlackKey ></BlackKey>
                <WhiteKey note = {require("./assets/sol.mp3")}></WhiteKey>
                <BlackKey ></BlackKey>
                <WhiteKey note = {require("./assets/la.mp3")}></WhiteKey>
                <BlackKey ></BlackKey>
                <WhiteKey note = {require("./assets/si.mp3")}></WhiteKey>


            </View>
            <Text style = {{fontSize:30}}>This is PracticeScreen</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#143F6B',
      justifyContent: 'center',
      alignItems: 'center',
    },
    piano: {
      flexDirection: 'row',
    },
    whiteKey: {
      width: 80,
      height: 200,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#333',
    },
    blackKey: {
      width: 30,
      height: 110,
      backgroundColor: 'black',
      marginLeft: -30,
      marginRight: -30,
      zIndex: 2,
    },
  });
  


export default PracticeScreen