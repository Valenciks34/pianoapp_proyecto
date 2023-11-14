import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addNote, removeNote } from "../../../store/slices/pianoSlice";


const PianoButton = ({item, _}) => {
  const dispatch = useDispatch();

  let pressed = false;

  let noteTimer;
  let bemolTimer;

  const debounceWhite = (callback, delay) => {
    if(pressed) return;
    
    clearTimeout(noteTimer);
    
    noteTimer = setTimeout(callback, delay);
  };

  const debounceBlack = (callback, delay) => {
    pressed = true;
    
    callback();
    
    bemolTimer = setInterval(() => {
      pressed = false;
      clearTimeout(bemolTimer);
    }, delay);
  };

  useEffect(() => {
    return () => {
      clearTimeout(noteTimer);
      clearTimeout(bemolTimer);
    };
  }, []);
  

  return (
    <GestureDetector
      gesture={Gesture.Tap().onTouchesDown(() => {
        debounceWhite(() => {
          dispatch(addNote(item.note));
        }, 10);
      })}
    >
      <View 
        style={styles.note} 
        onTouchEnd={() =>  dispatch(removeNote(item.note))} >
        {/* BLACK NOTE */}
        {
          item.bemol && <View style={styles.absolute}>
            <GestureDetector
              gesture={Gesture.Tap().onTouchesDown(() => {
                debounceBlack(() => console.log(item.bemol.note), 10);
              })}
            >
              <View style={styles.bemol}>
                <View style={styles.text}>
                  <Text variant="titleMedium" style={{color: "white"}} >
                    {item.bemol.note}
                  </Text>
                </View>
              </View>
            </GestureDetector>
          </View>
        }

        {/* WHITE NOTE */}
        <View style={styles.text}>
          <Text variant="titleLarge">
            {item.note}
          </Text>
        </View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  note: {
    flexGrow: 1,
    backgroundColor:"white",
    borderWidth: 0.5,
    justifyContent: "center",
    paddingLeft: 10.0,
  },

  absolute: {
    position: "absolute",
    width: "40%",
    height: "50%",
    top: "-25%",
    right: 0,
  },

  bemol: {
    flex:1,
    backgroundColor: "black",
    justifyContent: "center",
    paddingLeft: 5.0,
  },

  text: {
    alignSelf: "flex-start",
    transform: [{rotate: '90deg'}],
  }
});

export default PianoButton;



