import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { SafeAreaView, StyleSheet, Text,Image,View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { auth } from "../../../firebaseConfig";
import { useState } from "react";


const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);



  const theme = useTheme();


  const register = async () => {

  setRegisterError(null);
  setEmailError(null); 
  setPasswordError(null);

  if(email.includes('@') === false ){
    setEmailError("No parece ser un formato de correo valido")
    return;
  }

  if(password.length <= 7){
    setPasswordError("La contraseña debe tener minimo 8 caracteres")
    return;
  }

    try {         
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(auth)
    } catch (error) {
      setRegisterError("El usuario no se registro, verifique los campos");
      console.log(error);
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
      
      <Text style={styles.tittle}>REGISTER SCREEN</Text>

      <View style = {{ width:250 }}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        {(emailError != null) && <HelperText type="info">{emailError}</HelperText>}

        <View style={{ height: 15 }} />

        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        {(passwordError != null) && <HelperText type="info">{passwordError}</HelperText>}


        <View style={{ height: 15 }} />

        {(registerError != null) && <HelperText type="info">{registerError}</HelperText>}



        <Button
          buttonColor="#7A9D54"
          textColor="#fff"
          icon="account-check"
          mode="contained"
          onPress={register}
        >
        Register
        </Button>

        

        <View style={{ height: 10 }} />

        <Text variant="titleMedium" style = {{color: theme.colors.primary, textDecorationLine:'underline'}}
         onPress={() => navigation.goBack()}>
          Are you ready register?, go to login to begin!
        </Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
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

export default RegisterScreen;
