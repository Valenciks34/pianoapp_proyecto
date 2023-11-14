import { View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { Text } from "react-native-paper";


export const BlackButton = ({item, _}) => {
  
  return(
    <GestureDetector
      // onPress={item.bemol.tap}
      gesture={item.tap}
    >
      <View style={{
        // flexGrow:1,
        height: 40, 
        backgroundColor: "black", 
        justifyContent: "center", 
        paddingLeft: 10.0,
        alignSelf: "flex-end",
        width: "40%",
        // marginTop: "-10%"
        transform: [{translateY: -20}]
      }}>
        <View 
          style={{
            alignSelf: "flex-start",
            transform: [{rotate: '90deg'}],
          }}
        >
          <Text variant="titleMedium" style={{color: "white"}}  >
            {item.note}
          </Text>
        </View>
      </View>

    </GestureDetector>
  );
};