import axios from "axios";
import { signOut } from "firebase/auth"
import { getDoc, collection, doc } from "firebase/firestore";
import React, { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { Appbar, Button, Text, Divider, Card } from "react-native-paper";
import { useSelector } from "react-redux";

import CounterButton from "./counterButton";
import { auth, db } from "../../../firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const [pokemon, setPokemon] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const counter = useSelector((state) => state.counter.value);

  const getPokemon = async () => {
    const pokemonId = Math.floor(Math.random() * 100);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    );
    setPokemon(response.data);
  };

  const getUserInfo = async () => {
    const userDoc = doc(db, "users", "DLNAJYxiMEzT32Qi0vAF");
    const snapshot = await getDoc(userDoc);
    setUserInfo(snapshot.data());
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Homescreen" />
        <Appbar.Action icon="account" onPress={() => {}} />
        <Appbar.Action icon="logout" onPress={() => signOut(auth)} />
      </Appbar.Header>
      <Divider bold/>

      <ScrollView>

        <View style = {{backgroundColor:"#fff", height:"100%"}}>

          <View style ={{height:40}}/>

          <View style ={{ display:"flex" ,justifyContent:"center", alignItems:"center"}}>
            <Card style = {{ display:"flex" ,justifyContent:"center", alignItems:"center", width:"80%", backgroundColor:"#f7f7f7"}} type="outlined">
              <Card.Content>
                <Text variant="headlineLarge" style={{textAlign:"center", marginBottom:10}}>Lecciones teoricas</Text>
              </Card.Content>
              <Card.Cover source ={require("./assets/lesson.png")} resizeMode="center"/>
              <Card.Content>
                <Text variant="bodyMedium" style={{textAlign:"center", marginTop:10}}>Si eres principiante conoce los conceptos basicos de este instrumento, aqui podras ver clases teoricas que te ayudaran a entender mejor la naturaleza del instrumento.</Text>
              </Card.Content>
              <Card.Actions style = {{padding:20}}>
                <Button>Cancel</Button>
                <Button >Ok</Button>
              </Card.Actions>
            </Card>
          </View>

          <View style ={{diplat:"flex", height:40, justifyContent:"center"}}>
            <Divider bold/>
          </View>

          <View style ={{ display:"flex" ,justifyContent:"center", alignItems:"center"}}>
            <Card style = {{ display:"flex" ,justifyContent:"center", alignItems:"center", width:"80%", backgroundColor:"#f7f7f7"}} type="outlined">
              <Card.Content>
                <Text variant="headlineLarge" style={{textAlign:"center", marginBottom:10}}>Lecciones teoricas</Text>
              </Card.Content>
              <Card.Cover source ={require("./assets/piano.png")} resizeMode="center"/>
              <Card.Content>
                <Text variant="bodyMedium" style={{textAlign:"center", marginTop:10}}>Si eres principiante conoce los conceptos basicos de este instrumento, aqui podras ver clases teoricas que te ayudaran a entender mejor la naturaleza del instrumento.</Text>
              </Card.Content>
              <Card.Actions style = {{padding:20}}>
                <Button>Cancel</Button>
                <Button >Ok</Button>
              </Card.Actions>
            </Card>
          </View>  

        </View>

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
