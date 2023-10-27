import { FlatList } from 'react-native';
import {  View } from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';

const LessonScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Lesson Screen" />
      </Appbar.Header>
      <Divider bold/>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={[1,2,3,4,5,6,7,8]}
        contentContainerStyle={{padding:10}}
        ItemSeparatorComponent={() => <View style={{height: 30.0}} />}
        renderItem={({item, index}) => (
          <View
            style={{
              padding: 15,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
              borderRadius: 20.0,
              backgroundColor: "white",
              width:"100%"
            }}
          > 
            <View style={{width:"100%", flexDirection:"row", alignItems:"center"}}>
              <View>
                <View style={{width: 70.0}} />

                <View style={{position:"absolute", top: -35,  }}>
                  <Image
                    style={{width: 70, height:70, resizeMode: "contain"}}
                  source={require('../../../assets/images/piano_3d.png')} />

                  {/* <Icon name="music-note" size={50} color={"black"} /> */}
                </View>
              </View>

              <View style={{width: 20.0}} />

              <View style={{flexShrink:1}}>
                <Text variant="titleMedium" >
                  Leccion {index}
                </Text>
                <Text variant="bodyMedium" numberOfLines={2} >
                  Nostrud adipisicing duis incididunt voluptate commodo sit sit anim in culpa laborum adipisicing irure nostrud.
                </Text>
              </View>

              <View style={{width: 10.0}} />

              <Icon name="star-check" size={30} color={"black"} />
            </View>
            

          </View>
        )}
      />

    </View>
  );
};

export default LessonScreen;