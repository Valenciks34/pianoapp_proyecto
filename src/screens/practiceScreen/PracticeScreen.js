import { View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { Text } from 'react-native-paper';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const notes = [
  {
    note:"C",
    // src:require("../../../assets/piano-mp3/C4.mp3"),
    tap: Gesture.Tap().onTouchesDown(() => console.log("C"))
  },
  {
    note:"D",
    // src:require("../../../assets/piano-mp3/D4.mp3"),
    bemol: {
      note:"Db",
      // src:require("../../../assets/piano-mp3/Db4.mp3")
      tap: Gesture.Tap().onTouchesDown(() => console.log("Db"))
    },
    tap: Gesture.Tap().onTouchesDown(() => console.log("D"))
  },
  
  {
    note:"E",
    // src:require("../../../assets/piano-mp3/E4.mp3"),
    bemol: {
      note:"Eb",
      // src:require("../../../assets/piano-mp3/Eb4.mp3")
      tap: Gesture.Tap().onTouchesDown(() => console.log("Eb"))
    },
    tap: Gesture.Tap().onTouchesDown(() => console.log("E"))
  },
  {
    note:"F",
    // src:require("../../../assets/piano-mp3/F4.mp3")
    tap: Gesture.Tap().onTouchesDown(() => console.log("F"))
  },
  {
    note:"G",
    // src:require("../../../assets/piano-mp3/G4.mp3"),
    bemol: {
      note:"Gb",
      // src:require("../../../assets/piano-mp3/Gb4.mp3")
      tap: Gesture.Tap().onTouchesDown(() => console.log("Gb"))
    },
    tap: Gesture.Tap().onTouchesDown(() => console.log("G"))
  },
  {
    note:"A",
    // src:require("../../../assets/piano-mp3/A4.mp3"),
    bemol: {
      note:"Ab",
      // src:require("../../../assets/piano-mp3/Ab4.mp3")
      tap: Gesture.Tap().onTouchesDown(() => console.log("Ab"))
    },
    tap: Gesture.Tap().onTouchesDown(() => console.log("A"))
  },
  {
    note:"B",
    // src:require("../../../assets/piano-mp3/B4.mp3"),
    bemol: {
      note:"Bb",
      // src:require("../../../assets/piano-mp3/Bb4.mp3")
      tap: Gesture.Tap().onTouchesDown(() => console.log("Bb"))
    },
    tap: Gesture.Tap().onTouchesDown(() => console.log("B"))
  },
];

const PracticeScreen = ({navigation}) => {

  return (
    <View 
      style = {{
        flexGrow:1, 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:"#199"
      }}>
      <View style={{flexGrow: 0.9, flexShrink: 1, paddingHorizontal:20, flexDirection: "row"}}>
        <View style={{flex:0.8}}>
          <View style={{flexGrow: 1}}>
            <View style={styles.caser}/>

            {
              notes.map((item, index) => {
                return <GestureDetector 
                  key={item.note} 
                  gesture={item.tap}
                >
                  <View style={styles.note} >
                    {
                      item.bemol && <View style={styles.bemol}>
                        <GestureDetector
                          gesture={item.bemol.tap}
                        >
                          <View style={{flex:1, zIndex:999, backgroundColor: "red", justifyContent: "center", paddingLeft: 10.0}}>
                            <View 
                              style={{
                                alignSelf: "flex-start",
                                transform: [{rotate: '90deg'}],
                              }}
                            >
                              <Text variant="titleMedium" style={{color: "white"}}  >
                                {item.bemol.note}
                              </Text>
                            </View>
                          </View>

                        </GestureDetector>
                      </View>
                    }

                    <View 
                      style={{
                        flex:1,
                        paddingHorizontal: 20.0,
                        justifyContent: "center"
                      }}
                    >
                      <View 
                        style={{
                          alignSelf: "flex-start",
                          transform: [{rotate: '90deg'}],
                        }}
                      >
                        <Text variant="titleLarge"  >
                          {item.note}
                        </Text>
                      </View>
                    </View>
                  </View>
                </GestureDetector>;
              })
            }

            <View style={styles.casel}/>

          </View>
        </View>

        <View style={{flex: 0.2}}>
          <Text>Hola</Text>

        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  caser: {
    height: 50, 
    backgroundColor: "#fdcb50",
    borderTopLeftRadius: 20.0,
    borderTopRightRadius: 20.0
  },

  casel: {
    height: 50, 
    backgroundColor: "#fdcb50",
    borderBottomLeftRadius: 20.0,
    borderBottomRightRadius: 20.0
  },

  note: {
    flexGrow: 1,
    backgroundColor:"white",
    borderWidth: 0.5,
    zIndex: 0
  },

  bemol: {
    position: "absolute",
    width: "40%",
    height: "40%",
    top: "-20%",
    right: 0,
    backgroundColor: "black",
    justifyContent: "center",
    zIndex: 999
  }
});

export default PracticeScreen;