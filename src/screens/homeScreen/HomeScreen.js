import { signOut } from "firebase/auth";
import { View, ScrollView } from "react-native";
import { Appbar, Button, Text, Divider, Card } from "react-native-paper";
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

      <ScrollView 
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
              <Button>Cancel</Button>
              <Button >Ok</Button>
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
      
      </ScrollView>

    </View>
  );
}