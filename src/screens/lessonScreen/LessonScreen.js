import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Appbar, Divider, Text } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import { useGetLessons } from './hooks/useGetLessons';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function LessonScreen({route, navigation}) {
  const { isLoading, error, lessons, getLessons } = useGetLessons();

  const { categoryId } = route.params;

  useEffect(() => {
    if(lessons == null) {
      getLessons(categoryId);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Lesson Screen" />
      </Appbar.Header>
      
      <Divider bold/>

      {
        isLoading
          ? <View style={styles.center}>
            <ActivityIndicator />
          </View>
          : <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={lessons}
            contentContainerStyle={{padding:10}}
            ItemSeparatorComponent={() => <View style={{height: 30.0}} />}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.7} 
                onPress={() => navigation.push("LessonDetail", { categoryId: categoryId, lesson: item })} 
                style={styles.card}
              > 
                <View style={{width:"100%", flexDirection:"row", alignItems:"center"}}>
                  <View>
                    <View style={{width: 70.0}}> 
                      <Image
                        style={{height:70, resizeMode: "contain"}}
                        source={{uri: item.icon}} 
                      />
                    </View>
                  </View>
    
                  <View style={{width: 20.0}} />
    
                  <View style={{flexShrink:1}}>
                    <Text variant="titleMedium" >
                      Leccion {index + 1}: {item.title}
                    </Text>
                    <Text variant="bodyMedium" numberOfLines={2} >
                      {item.description}
                    </Text>
                  </View>
    
                  <View style={{width: 10.0}} />
    
                  <Icon name="star-check" size={30} color={"black"} />
                </View>
    
              </TouchableOpacity>
            )}
          />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%", 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 20.0,
    padding: 12.0,
    backgroundColor: "white",
  },

  cardContent: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems:'center',
  },

  center: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems:'center',
  }
});