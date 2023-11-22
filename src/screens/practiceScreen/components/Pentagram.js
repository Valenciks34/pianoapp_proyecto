import { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// const path = Path.Make();
// path.moveTo(128, 0);
// path.lineTo(168, 80);
// path.lineTo(256, 93);
// path.lineTo(192, 155);
// path.lineTo(207, 244);
// path.lineTo(128, 202);
// path.lineTo(49, 244);
// path.lineTo(64, 155);
// path.lineTo(0, 93);
// path.lineTo(88, 80);
// path.lineTo(128, 0);
// path.close();

const tones = ["DO", "RE", "MI", "FA", "SOL", "LA" , "SI"];

const Pentagram = () => {
  const { value } = useSelector((state) => state.piano);

  const [size, setSize] = useState(null);

  const onLayout = (event) => {
    setSize(event.nativeEvent.layout);
  };

  const width = size?.width ?? 0;

  const iconSize = width / 1.5;

  const noteSize = 40;

  const lineSpace = (width * 0.6) / 4;

  return (
    <View style={{flex:1}} onLayout={onLayout}>
      {
        size &&
          <View style={{flex: 1}}>
            {/* Lineas */}
            <View style={{position: "absolute", width: "60%", right: 10.0, flexDirection: "row", alignSelf: "flex-end", justifyContent: "space-between"}}>
              {
                Array.from({length: 5}).map((_, index) => {
                  return <View
                    key={index.toString()}
                    style={{width: 2, backgroundColor: "#000", height: size.height}} 
                  />;
                })
              }
            </View>

            <View style={{position: "absolute", right:0, top: -iconSize / 4, zIndex: 1}}>
              <Icon 
                name="music-clef-treble" 
                size={iconSize} 
                style={{
                  transform: [
                    {rotate: "90deg"}, 
                  ]
                }} 
              />
            </View>

            <View style={{
              position: "absolute", 
              height: "100%", 
              right: 10, 
              width: "60%",
              zIndex: 2,
              justifyContent: "center",
            }}
            >
              <View style={{
                height: "80%", 
                // backgroundColor: "blue",
                justifyContent: "space-between"
              }}
              >
                {
                  tones.map((tone, index) => {
                    const step = 1 - (index * 0.5);

                    return <View 
                      key={index.toString()}
                      style={{
                        width: noteSize, 
                        height: noteSize, 
                        transform: [
                          {translateX: (-lineSpace * step) - (noteSize / 2)}
                        ],
                        opacity: value.includes(tone) ? 1 : 0
                      }}
                      // animate={{opacity: value.includes(tone) ? 1 : 0}}
                    >
                      <Icon
                        name="music-note-quarter"
                        // name="checkbox-blank-circle"
                        size={noteSize}
                        style={{
                          transform: [
                            {rotate: "90deg"}
                          ],
                        }}
                      />
                    </View>;
                  })
                }
              </View>
            </View>
          </View>
      }
    </View>
  );

  // return (
  //   <View style={{flex:1, alignItems: "center", justifyContent:"center"}}>
  //     {
  //       notes.map((item) => {
  //         return <Text
  //           key={item}
  //           style={{color: value.includes(item) ? "white" : "black" }}
  //         >
  //           {item}
  //         </Text>;
  //       })
  //     }
  //   </View>
  // );
};

export default Pentagram;