import { View, StyleSheet, Animated, Dimensions } from "react-native";


const {width} = Dimensions.get("screen");

const PageIndicator = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx-1)* width,idx * width, (idx+1)*width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12,30,12],
          extrapolate:"clamp",
        });
        
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#ccc","#003","#ccc"],
          extrapolate:"clamp",
        });

        return <Animated.View 
          key={idx.toString()} 
          style={[styles.dot, {width: dotWidth, backgroundColor}, idx === index && styles.dotActive]}
        />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // bottom: 20,
    paddingVertical: 12.0,
    flexDirection:"row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ccc",
    marginHorizontal: 3,
  },
  dotActive:{
    backgroundColor:"#003",
    
  }
});

export default PageIndicator;