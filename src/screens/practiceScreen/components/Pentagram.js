import { View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";

const notes = ["C", "D", "E", "F", "G", "A", "B"];


const Pentagram = () => {
  const { value } = useSelector((state) => state.piano);

  return (
    <View style={{flex:1, alignItems: "center", justifyContent:"center"}}>
      {
        notes.map((item) => {
          return <Text
            key={item}
            style={{color: value.includes(item) ? "white" : "black" }}
          >
            {item}
          </Text>;
        })
      }
    </View>
  );
};

export default Pentagram;