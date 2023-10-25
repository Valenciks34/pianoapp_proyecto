import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";


export default function HelpScreen({navigation}) {
  const tap1 = Gesture.Tap().onBegin(() => console.log('ROJO'));
  const tap2 = Gesture.Tap().onBegin(() => console.log('AZUL'));

  return (
    <View style={{flexGrow:1}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Help" />
      </Appbar.Header>

      <View style={{flexGrow:1, justifyContent: "center", alignItems:"center"}}>
        <View style={{flexDirection:"row"}}>
          <GestureDetector gesture={tap1} >
            <View 
              // onTouchStart={() => console.log('ROJO')} 
              style={{width: 100, height: 100, backgroundColor: "red"}} 
            />

          </GestureDetector>

          <View style={{width: 50}} />

          <GestureDetector gesture={tap2}>
            <View 
              // onTouchStart={() => console.log('AZUL')} 
              style={{width: 100, height: 100, backgroundColor: "blue"}} 
            />
          </GestureDetector>

        </View>
      </View>
    </View>
  );
}