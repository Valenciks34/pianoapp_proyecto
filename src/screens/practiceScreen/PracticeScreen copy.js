import { Text, View, StyleSheet} from 'react-native';

import WhiteKey from './components/whiteKey';
import BlackKey from './components/blackKey';

const PracticeScreen = ({navigation}) => {
  return (
    <View style = {{display:"flex",justifyContent:'center', alignItems:'center', flex:1, backgroundColor:"#199"}}>
      <View style = {{display:"flex", flexDirection:"row"}}>
        <WhiteKey note = {require("../../../assets/tones/do.mp3")}></WhiteKey>
        <BlackKey ></BlackKey>
        <WhiteKey note = {require("../../../assets/tones/re.mp3")}></WhiteKey>
        <BlackKey ></BlackKey>
        <WhiteKey note = {require("../../../assets/tones/mi.mp3")}></WhiteKey>
        <WhiteKey note = {require("../../../assets/tones/fa.mp3")}></WhiteKey>
        <BlackKey ></BlackKey>
        <WhiteKey note = {require("../../../assets/tones/sol.mp3")}></WhiteKey>
        <BlackKey ></BlackKey>
        <WhiteKey note = {require("../../../assets/tones/la.mp3")}></WhiteKey>
        <BlackKey ></BlackKey>
        <WhiteKey note = {require("../../../assets/tones/si.mp3")}></WhiteKey>
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