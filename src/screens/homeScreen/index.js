import { signOut } from "firebase/auth"
import { View, ScrollView } from "react-native";
import { Appbar, Button, Text, Divider, Card } from "react-native-paper";
import { useDispatch } from "react-redux";

import { auth } from "../../../firebaseConfig";
import { setUser } from "../../store/slices/userSlice";
import { StackActions } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setUser(null));
    signOut(auth);
    navigation.dispatch(StackActions.replace('Login'));
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Homescreen" />
        <Appbar.Action icon="account" onPress={() => {}} />
        <Appbar.Action icon="logout" onPress={logout} />
      </Appbar.Header>
      <Divider bold/>

      <ScrollView 
        contentContainerStyle={{paddingVertical: 40.0, backgroundColor:"#fff", alignItems: "center"}}
      >
        <Card style = {{width:"80%", backgroundColor:"#f7f7f7"}} type="outlined">
          <Card.Content>
            <Text variant="headlineLarge" style={{textAlign:"center", marginBottom:10}}>Lecciones teoricas</Text>
          </Card.Content>
          <Card.Cover source ={require("./assets/lesson.png")} resizeMode="center"/>
          <Card.Content>
            <Text variant="bodyMedium" style={{textAlign:"justify", marginTop:10}}>Si eres principiante conoce los conceptos basicos de este instrumento, aqui podras ver clases teoricas que te ayudaran a entender mejor la naturaleza del instrumento.</Text>
          </Card.Content>
          <Card.Actions style = {{padding:20}}>
            <Button>Cancel</Button>
            <Button >Ok</Button>
          </Card.Actions>
        </Card>

        <View style={{width: "85%", height: 30, justifyContent: "center"}}>
          <Divider  />
        </View>

        <Card style = {{width:"80%", backgroundColor:"#f7f7f7"}} type="outlined">
          <Card.Content>
            <Text variant="headlineLarge" style={{textAlign:"center", marginBottom:10}}>Lecciones teoricas</Text>
          </Card.Content>
          <Card.Cover source ={require("./assets/piano.png")} resizeMode="center"/>
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
};

  // return (
  //   <View style={{ flex: 1 }}>
  //     <Appbar.Header>
  //       <Appbar.Content title="Homescreen" />
  //       <Appbar.Action icon="account" onPress={() => navigation.navigate("Profile")} />
  //       <Appbar.Action icon="logout" onPress={() => signOut(auth)} />
  //     </Appbar.Header>

  //     <View style={{ backgroundColor: "#435334" }}>
  //       <View
  //         style={{
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "45%",
  //           width: "100%",
  //           borderBottomWidth: 2,
  //           borderBottomColor: "#fff",
  //         }}
  //         on
  //       >
  //         <Image
  //           style={{ width: 200, height: 200 }}
  //           source={{
  //             uri: "https://cdn.icon-icons.com/icons2/2070/PNG/512/piano_icon_126600.png",
  //           }}
  //         />

  //         <Text
  //           variant="headlineLarge"
  //           style={{ color: "#fff" }}
  //           onPress={() => navigation.navigate("Lessons")}
  //         >
  //           Learn Piano
  //         </Text>
  //       </View>

  //       <View
  //         style={{
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "45%",
  //           width: "100%",
  //         }}
  //       >
  //         <View
  //           style={{
  //             justifyContent: "center",
  //             alignItems: "center",
  //             height: "55%",
  //             width: "50%",
  //             backgroundColor: "#fff",
  //             borderRadius: 30,
  //           }}
  //         >
  //           <Image
  //             style={{ width: 200, height: 200 }}
  //             source={{
  //               uri: "https://static.thenounproject.com/png/1174962-200.png",
  //             }}
  //           />
  //         </View>

  //         <Text
  //           variant="headlineLarge"
  //           style={{ color: "#fff", paddingTop: 30 }}
  //           onPress={() => navigation.navigate("Practice")}
  //         >
  //           Practice piano
  //         </Text>
  //       </View>
  //     </View>

  //     {/* <View style={{ flex:1,justifyContent:'center',alignItems:'center'}}>
  //         <View style={{justifyContent:'center',alignItems:'center'}}>
  //           <Button  onPress={getPokemon} mode="contained">Get Pokemon name 😎</Button>

  //           <View style={{height:20}}/>

  //           {pokemon !== null && <Text>{pokemon.name}</Text>}
  //         </View>

  //         <View style={{height:20}}/>

  //         <View style={{justifyContent:'center',alignItems:'center'}}>
  //           <Button  onPress={getUserInfo} mode="contained">Get User email 👍</Button>

  //           <View style={{height:20}}/>

  //           {userInfo !== null && <Text>{userInfo.email}</Text>}
  //         </View>

  //         <View style={{height:20}}/>


  //         <View style={{justifyContent:'center',alignItems:'center'}}>
  //           <CounterButton  />

  //           <View style={{height:20}}/>

  //           <Text> {counter} </Text>
  //         </View>

  //       </View> */}
  //   </View>
  // );


export default HomeScreen;
