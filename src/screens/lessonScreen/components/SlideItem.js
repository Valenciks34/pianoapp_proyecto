import {View, StyleSheet, Animated, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");

const SlideItem = ({item, size}) => {

  return (
    <View 
      style={{
        // width: size.width, 
        // height: size.height ,
        // backgroundColor: "blue",
        width: width,
        justifyContent: "center",
        alignItems: "center",
        padding: 20.0
      }}
    >
      <Text variant='headlineLarge' style={{textAlign: "center"}}>{item.title}</Text>
            
      <Animated.Image source = {{uri: item.image}} 
        resizeMode="contain"
        style={styles.image}
      />

      {
        item.paragraphs.map((text, index) => {
          return <Text 
            key={index.toString()}
            variant='bodyLarge'
            style={{textAlign: "justify"}}
          >
            {text}
          </Text>;
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },

  image:{
    width:"80%",
    marginVertical:0,
    height:"35%",
    // borderRadius:8,

  },
  content: {
    alignItems:"center",
    flex:0.4,
  },

  title:{
    fontSize:32,
    fontWeight:"bold",
    marginVertical:10,
    color:"#003049",
  },

  text:{
    fontSize:18,
    marginHorizontal:24,
    color:"#333",
    marginTop:10
  },

  text2:{
    fontSize:18,
    marginHorizontal:24,
    color:"#333",
    marginTop:10
  },
  description:{
    fontSize:24,
    color:"#333",
    fontWeight:"bold"
  },
  description2:{
    fontSize:24,
    color:"#333",
    fontWeight:"bold"
  },
  playMe:{
    color:"#000"
  }

})

export default SlideItem;
