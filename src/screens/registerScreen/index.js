import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { SafeAreaView, StyleSheet, Text,Image,View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { auth } from "../../../firebaseConfig";
import { useState } from "react";


const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [registerError, setRegisterError] = useState(null);
  
  const theme = useTheme();

  const register = async () => {
    Keyboard.dismiss();

    setFormErrors({});

    var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let errors = {};

    if(!email.match(validEmail)){
      errors = {...errors, email: "Debe ingresar un email valido"};
      console.log(errors)
    }

    if(password.length < 6){
      errors = {...errors, password: "La contraseña debe tener minimo 6 caracteres"};
      console.log(errors.password)
    }

    if(Object.keys(errors).length > 0) {
      setFormErrors(errors);
      console.log(errors)
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(auth)
    } catch (error) {
      setRegisterError(error);
      console.log(auth)
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://cdn5.vectorstock.com/i/thumb-large/68/64/piano-logo-design-template-for-music-instrument-vector-30206864.jpg",
          }}
        />

        <View style={{ height: 25 }} />
        
        <Text style={styles.tittle}>REGISTER SCREEN</Text>

        <View style={{ height: 25 }} />

        <View style = {{ width:250 }}>
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

          <HelperText HelperText type="error" visible={formErrors.password}>
            {formErrors.password}
          </HelperText>

          {registerError && 
            <HelperText type="error" style={{textAlign: "center", paddingBottom: 10}}>
              {registerError.toString()}
            </HelperText>
          }

          <View style={{ height: 1 }} />

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

export default RegisterScreen;
