import { signOut } from "firebase/auth";
import { View, ScrollView, Image, FlatList, TouchableOpacity } from "react-native";
import { Appbar, Button, Text, Divider, Card, TouchableRipple } from "react-native-paper";
import { useDispatch } from "react-redux";
import { StackActions } from "@react-navigation/native";

import { auth } from "../../../firebaseConfig";
import { setUser } from "../../store/slices/userSlice";
// import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

const lessonImage = require("../../../assets/images/lesson.png");
const pianoImage = require("../../../assets/images/piano.png");

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

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

      <FlatList 
        data={[1,2,3,4,5,6,7,8,9,10]}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{padding: 20.0}}
        ItemSeparatorComponent={() => <View style={{height: 20.0}} />}
        columnWrapperStyle={{justifyContent: "space-between"}}
        renderItem={({_}) => (
          <TouchableOpacity activeOpacity={0.7}  onPress={() => navigation.push("Lessons")} style={{
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
            backgroundColor: "white",
            // boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
          }}>
            <View style={{
              width: "100%",
              height: "100%",
              justifyContent: 'center',
              alignItems:'center',
            }}  >
            <Text variant="titleLarge" >Historia</Text>
            <Image source={require('../../../assets/images/piano_3d.png')} />
          </View>
          </TouchableOpacity>
        )}
      />

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