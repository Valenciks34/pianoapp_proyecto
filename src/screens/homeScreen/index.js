import { useState } from 'react';
import { View,Image} from 'react-native'
import React from 'react'
import { Appbar, Button, Text } from 'react-native-paper';
import { auth, db } from '../../../firebaseConfig';
import { getDoc,collection,doc } from 'firebase/firestore';
import axios from 'axios';
import CounterButton from './counterButton';
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';


const HomeScreen = ({navigation}) => {
    

  const [pokemon, setPokemon] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const counter = useSelector(state => state.counter.value);


  const getPokemon = async () => {
    const pokemonId = Math.floor(Math.random()*100);
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    setPokemon(response.data)
  }

  const getUserInfo = async () => {
    const userDoc = doc(db, 'users', 'DLNAJYxiMEzT32Qi0vAF');
    const snapshot = await getDoc(userDoc);
    setUserInfo(snapshot.data());
  }

  return (
    
      <View style={{flex:1}}>
        <Appbar.Header>

            <Appbar.BackAction onPress={() => signOut(auth)} />

            <Appbar.Content title="Homescreen" />

            <Appbar.Action icon="calendar" onPress={() => {}} />
            
            <Appbar.Action icon="magnify" onPress={() => {}} />
            

        </Appbar.Header>

      <View style = {{backgroundColor:'#435334'}}>
        <View style = {{ 
          justifyContent:'center', alignItems:'center', height:'45%', width:'100%', borderBottomWidth: 2, borderBottomColor:'#fff'
          }}
          on>

          <Image style={{width:200, height:200}}
          source={{
            uri: 'https://cdn.icon-icons.com/icons2/2070/PNG/512/piano_icon_126600.png',
            }}
          />

          <Text variant="headlineLarge" style={{color:'#fff'}}
          onPress={ () => navigation.navigate('Lessons')}>
            Learn Piano</Text>

          </View>

          <View style = {{ justifyContent:'center', alignItems:'center', height:'45%', width:'100%'}}>
            <View style = {{ justifyContent:'center', alignItems:'center', height:'55%', width:'50%',backgroundColor:'#fff', borderRadius:30}}>

                <Image style={{width:200, height:200}}
                source={{
                  uri: 'https://static.thenounproject.com/png/1174962-200.png',
                }}
                />

            </View>

            <Text variant="headlineLarge" style={{color:'#fff', paddingTop:30}}
            onPress={() => navigation.navigate('Practice')}>
              Practice piano
                </Text>

          
          </View>

      </View>

        {/* <View style={{ flex:1,justifyContent:'center',alignItems:'center'}}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Button  onPress={getPokemon} mode="contained">Get Pokemon name 😎</Button>

            <View style={{height:20}}/>

            {pokemon !== null && <Text>{pokemon.name}</Text>}
          </View>

          <View style={{height:20}}/>

          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Button  onPress={getUserInfo} mode="contained">Get User email 👍</Button>

            <View style={{height:20}}/>

            {userInfo !== null && <Text>{userInfo.email}</Text>}
          </View>

          <View style={{height:20}}/>


          <View style={{justifyContent:'center',alignItems:'center'}}>
            <CounterButton  />

            <View style={{height:20}}/>

            <Text> {counter} </Text>
          </View>

        </View> */}
      </View>
    
  )
}

export default HomeScreen