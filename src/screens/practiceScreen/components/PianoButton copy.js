import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Audio } from 'expo-av';
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";

import { addNote, removeNote } from "../../../store/slices/pianoSlice";
import { cache } from "./ToneCache";


const PianoButton = ({item}) => {
  const [tone, setTone] = useState(null);
  const [toneb, setToneb] = useState(toneb);

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

  useEffect(() => {
    if(cache.has(item.path)) {
      return;
    }

    loadTones();

    return () => {
      tone?.unloadAsync();
      toneb?.unloadAsync();
    };
  },[]);
  
  const loadTones = async () => {
    const tones = [Audio.Sound.createAsync(item.path)];

    if(item.bemol) {
      tones.push(Audio.Sound.createAsync(item.bemol.path));
    }

    const [audio, audiob] = await Promise.all(tones);

    cache.set(item.path, audio.sound);
    
    if(audiob) {
      cache.set(`${item.path} bemol`, audiob.sound);
    }
  };

  return (
    <GestureDetector
      gesture={Gesture.Tap().onTouchesDown((e) => {
        debounceWhite(() => {
          console.log(`tone: ${item.note}`);

          try {
            tone?.replayAsync();

            if(tone) {
              dispatch(addNote(item.note));
            }
          } catch (error) {
            console.log(`error: ${error}`);
          }
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
                debounceBlack(() => {
                  toneb.replayAsync();
                  dispatch(addNote(item.bemol.note));
                }, 10);
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
    borderWidth: 2.0,
    justifyContent: "center",
    paddingLeft: 10.0,
    borderRadius: 10.0,
    backgroundColor: "#f5f5f5"
  },

  absolute: {
    position: "absolute",
    width: "40%",
    height: "50%",
    top: "-25%",
    right: -2.5,
    
  },

  bemol: {
    flex:1,
    borderRadius: 10.0,
    backgroundColor: "#201f1f",
    justifyContent: "center",
    paddingLeft: 5.0,
  },

  text: {
    alignSelf: "flex-start",
    transform: [{rotate: '90deg'}],
  }
});

export default PianoButton;



