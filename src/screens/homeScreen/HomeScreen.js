import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { Appbar, Text, Divider, ActivityIndicator } from "react-native-paper";
import { useDispatch } from "react-redux";
import { StackActions } from "@react-navigation/native";

import { auth } from "../../../firebaseConfig";
import { setUser } from "../../store/slices/userSlice";
import { StyleSheet } from "react-native";
import { useGetCategories } from "./hooks/useGetCategories";
// import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";


export default function HomeScreen({ navigation }) {
  const { isLoading, categories, getCategories } = useGetCategories();

  const dispatch = useDispatch();

  useEffect(() => {
    if(categories == null) {
      getCategories();
    }
  }, []);

  const logout = () => {
    dispatch(setUser(null));
    signOut(auth);
    navigation.dispatch(StackActions.replace("Login"));
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Homescreen" />
        <Appbar.Action icon="account" onPress={() => navigation.navigate("Profile")} />
        <Appbar.Action icon="logout" onPress={logout} />
      </Appbar.Header>
      <Divider bold/>

      {
        isLoading
          ? <View style={styles.center}>
            <ActivityIndicator />
          </View>
          : <FlatList 
            data={categories}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={{padding: 20.0}}
            ItemSeparatorComponent={() => <View style={{height: 20.0}} />}
            columnWrapperStyle={{justifyContent: "space-between"}}
            renderItem={({item}) => (
              <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => navigation.push("Lessons", { categoryId: item.id })} 
                style={styles.card}
              >
                <View style={styles.cardContent}>
                  <View style={{height: 44 * 1.4, justifyContent: 'center'}}>

                    <Text variant="titleLarge" 
                      numberOfLines={2}
                      style={{textAlign: "center"}}
                    // adjustsFontSizeToFit={true}
                    >{item.name}</Text>
                  </View>
                  
                  <View style={{height:10}} />
                  <View style={{flexGrow:1, width:"100%"}}>
                    <Image style={{flex: 1, resizeMode: "contain"}} source={{uri: item.image}} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
      }
      

      {/* <ScrollView 
        contentContainerStyle={{paddingVertical: 40.0, backgroundColor:"#fff", alignItems: "center"}}
      >
        <View>
          <Card style = {{width:"80%", backgroundColor:"#f7f7f7"}} type="outlined">
            <Card.Content>
              <Text variant="headlineLarge" style={{textAlign:"center", marginBottom:10}}>Lecciones teoricas</Text>
            </Card.Content>
            <Card.Cover source ={lessonImage} resizeMode="center"/>
            <Card.Content>
              <Text variant="bodyMedium" style={{textAlign:"justify", marginTop:10}}>Si eres principiante conoce los conceptos basicos de este instrumento, aqui podras ver clases teoricas que te ayudaran a entender mejor la naturaleza del instrumento.</Text>
            </Card.Content>
            <Card.Actions style = {{padding:20}}>
              <Button onPress={() => {}} >Cancel</Button>
              <Button onPress={() => {}} >Ok</Button>
            </Card.Actions>
          </Card>
        </View>

        <View style={{width: "85%", height: 30, justifyContent: "center"}}>
          <Divider  />
        </View>

        <Card style = {{width:"80%", backgroundColor:"#f7f7f7"}} type="outlined">
          <Card.Content>
            <Text variant="headlineLarge" style={{textAlign:"center", marginBottom:10}}>Lecciones teoricas</Text>
          </Card.Content>
          <Card.Cover source ={pianoImage} resizeMode="center"/>
          <Card.Content>
            <Text variant="bodyMedium" style={{textAlign:"justify", marginTop:10}}>Si eres principiante conoce los conceptos basicos de este instrumento, aqui podras ver clases teoricas que te ayudaran a entender mejor la naturaleza del instrumento.</Text>
          </Card.Content>
          <Card.Actions style = {{padding:20}}>
            <Button>Cancel</Button>
            <Button >Ok</Button>
          </Card.Actions> 
        </Card>
      
      </ScrollView> */}

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47.5%", 
    aspectRatio: 1,
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