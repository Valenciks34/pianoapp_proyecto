import { useRef, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Animated } from "react-native";
import { ActivityIndicator, Appbar, Divider, Text } from "react-native-paper";

import SlideItem from "./components/SlideItem";
import PageIndicator from "./components/PageIndicator";
import { useGetSlides } from "./hooks/useGetSlides";

export default function LessonDetailScreen({route, navigation}) {
  const { isLoading, error, slides, getSlides } = useGetSlides();

  const { categoryId, lesson } = route.params;

  useEffect(() => {
    if(slides == null) {
      getSlides(categoryId, lesson.id);
    }
  }, []);

  const [index, setIndex] = useState(0);
  const [size, setSize] = useState({});

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset:{
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) =>{
    setIndex(viewableItems[0].index);
  }).current;

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title={lesson.title} />
      </Appbar.Header>
      
      <Divider bold />

      {
        isLoading 
          ? <View style={styles.center}>
            <ActivityIndicator />
          </View>
          : <View style={{flex:1}}>
            {/* <SlideItem item={slides[1]} /> */}

            <FlatList 
              keyExtractor={item => item.id}
              data={slides} 
              // contentContainerStyle={{backgroundColor:"red"}}
              renderItem = {({item}) => {
                return <SlideItem item={item} size={size} />;
              }}
              onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                setSize({width, height});
              }}
              horizontal 
              pagingEnabled
              snapToAlignment='center'
              showsHorizontalScrollIndicator = {false}
              onScroll={handleOnScroll}
              onViewableItemsChanged={handleOnViewableItemsChanged}
            />
            
            <PageIndicator data={slides} scrollX={scrollX} index={index}/>
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  }
});