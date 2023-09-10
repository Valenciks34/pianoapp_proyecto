import { signInWithEmailAndPassword } from "firebase/auth";
import React, {useState} from "react";
import { SafeAreaView, StyleSheet, Text, Image, View } from "react-native";
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";
import { auth } from "../../../firebaseConfig";




const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthenticated] = React.useState(null);

  const theme = useTheme();

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);


  const login = async () => {

    setEmailError(null); 
    setPasswordError(null);

    if(email.length === 0){
      setEmailError("El email es obligatorio")
      return;
    }

    if(password.length <= 7){
      setPasswordError("La contraseña debe tener minimo 8 caracteres")
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // navigation.navigate("Home");
    } catch (error) {
      console.error(error); 
    }
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://cdn5.vectorstock.com/i/thumb-large/68/64/piano-logo-design-template-for-music-instrument-vector-30206864.jpg",
        }}
      />
      
      

      <Text style={styles.tittle}>LOGIN SCREEN</Text>

      <View style={{ width: 250 }}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          
        />

        <HelperText type="error" visible={emailError != null}>
          {emailError}
        </HelperText>

        <View style={{ height: 15 }} />

        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        <HelperText type="error" visible={passwordError != null}>
          {passwordError}
        </HelperText>

        <View style={{ height: 15 }} />

        {isAuthenticated === false && <Text>Credenciales incorrectas</Text>}

        <Button
          textColor="#fff"
          icon="account"
          mode="contained"
          onPress={login}
        >
          Enter
        </Button>
      </View>

      <View style={{ height: 15 }} />

      <Text
        style={{color: theme.colors.primary, textDecorationLine: 'underline'}}
        onPress={() => navigation.push('Register')}
      >
          Dont have account?, register here!
      </Text>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  tittle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "grey",
  },
  tinyLogo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    borderRadius: 15,
  },
});

export default LoginScreen;
