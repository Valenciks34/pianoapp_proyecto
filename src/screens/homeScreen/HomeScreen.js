import { signOut } from "firebase/auth";
import { View } from "react-native";
import { Image } from 'expo-image';
import { Appbar, Text, Divider, TouchableRipple } from "react-native-paper";
import { StackActions } from "@react-navigation/native";

import { auth } from "../../../firebaseConfig";
import { setUser } from "../../store/slices/userSlice";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
// import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";


const options = [
  {
    title: 'TEORIA',
    path: require('../../../assets/images/manual.png'),
    route: 'Lessons'
  },
  {
    title: 'PLAY PIANO',
    path: require('../../../assets/images/teclado.png'),
    route: 'Practice'
  },
  {
    title: 'PERFIL',
    path: require('../../../assets/images/perfil.png'),
    route: 'Profile'
  },
  {
    title: 'AJUSTES',
    path: require('../../../assets/images/ajustes.png'),
    route: 'Settings'
  }
];


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
        <Appbar.Content title="Home Screen" />
        <Appbar.Action icon="account" onPress={() => navigation.navigate("Profile")} />
        <Appbar.Action icon="logout" onPress={logout} />
      </Appbar.Header>
      <Divider bold/>

      <View style={{flex: 1, paddingHorizontal:30.0, paddingVertical: 40.0, justifyContent:"center"}}>
        <View style={{flexGrow: 0.8}}>
          {
            options.map((item, index) => {
              return <View 
                key={index.toString()}
                style={{
                  flex: 1, 
                  // overflow: "hidden",
                  backgroundColor:"white",
                  borderColor: "black",
                  borderWidth:2,
                  borderTopLeftRadius: index === 0 ? 20 : 0,
                  borderBottomLeftRadius: index === options.length -1 ? 20.0 : 0.0,
                  // transform: [{translateY: index !== 0 ? -(0 * index) : 0.0}]
                }}
              >
                {
                  index !== 0 && <View 
                    style={{
                      position: "absolute",
                      width: "45%",
                      height: "35%",
                      backgroundColor: "#363332",
                      top: "-17.5%",
                      right: 0
                    }}
                  />
                }

                <TouchableRipple 
                  onPress={() => navigation.push(item.route)} 
                  style={{flex:1, padding: 20.0, flexDirection: "row", alignItems: "center"}}
                >
                  <>
                    <View style={{flex: 0.35, padding: 10.0}}>
                      <Image
                        source={item.path}
                        style={{flex:1}}
                        contentFit="contain"
                      />
                    </View>

                    <View style={{width:10.0}} />

                    <View style={{flex: 0.75}}>
                      <Text 
                        variant="headlineLarge"
                        style={{fontFamily: "wi500",  textDecorationLine: "underline"}}
                      >{item.title}</Text>
                    </View>
                  </>
                </TouchableRipple>
              </View>;
            }) 
          }
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor:"white", 
    borderRadius: 12, 
    overflow: "hidden", 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

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