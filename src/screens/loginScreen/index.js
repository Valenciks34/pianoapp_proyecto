import React, {useState} from "react";
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView, StyleSheet, Text, Image, View, TouchableWithoutFeedback, Keyboard } from "react-native";

import { auth } from "../../../firebaseConfig";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  
  const theme = useTheme();

  const login = async () => {
    Keyboard.dismiss();

    setFormErrors({});

    var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let errors = {};

    if(!email.match(validEmail)){
      errors = {...errors, email: "Debe ingresar un email valido"};
    }

    if(password.length < 6){
      errors = {...errors, password: "La contraseña debe tener minimo 6 caracteres"};
    }

    if(Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoginError(error);
    }
  };

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} >
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://cdn5.vectorstock.com/i/thumb-large/68/64/piano-logo-design-template-for-music-instrument-vector-30206864.jpg",
          }}
        />

        <View style={{ height: 25 }} />

        <Text style={styles.tittle}>LOGIN SCREEN</Text>

        <View style={{ height: 25 }} />

        <View style={{ width: 250 }}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            
          />
          
          <HelperText type="error" visible={formErrors.email}>
            {formErrors.email}
          </HelperText>

          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />

          <HelperText type="error" visible={formErrors.password}>
            {formErrors.password}
          </HelperText>

          <View style={{alignItems: "flex-end"}} >
            <Text o
              style={{color: theme.colors.primary}}
              onPress={() => navigation.push("ForgotPassword")} 
            >
              Forgot Password?
            </Text>
          </View>

          <View style={{ height: 20 }} />

          {loginError && 
            <HelperText type="error" style={{textAlign: "center", paddingBottom: 10}}>
              {loginError.toString()}
            </HelperText>
          }

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


      </View>
    </TouchableWithoutFeedback>
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
    color: "grey",
  },

  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
});

export default LoginScreen;
