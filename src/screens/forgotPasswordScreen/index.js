import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";

import { auth } from "../../../firebaseConfig";

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState("");

  const theme = useTheme();

  const [emailError, setEmailError] = useState(null);

  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = async () => {
    Keyboard.dismiss();

    setEmailSent(false);
    setEmailError(null);

    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(validEmail)) {
      setEmailError("Debe ingresar un email valido");
      console.log("ingrese un email valido")
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      console.log(auth, "envio de email exitoso");
    } catch (error) {
      setForgotPasswordError(error);
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

        <Text style={styles.tittle}>FORGET PASSWORD</Text>

        <View style={{ height: 25 }} />

        <View style={{ width: 250 }}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <HelperText type="error" visible={emailError}>
            {emailError}
          </HelperText>
          
          {(forgotPasswordError || emailSent) &&
            (
              forgotPasswordError 
                ?
                  <HelperText
                    type="error"
                    style={{ textAlign: "center", paddingBottom: 10 }}
                  >
                    {forgotPasswordError.toString()}
                  </HelperText>
                :
                  <HelperText
                    type="info"
                    style={{ textAlign: "center", paddingBottom: 10 }}
                  >
                    {"Email de recuperacion enviado exitosamente"}
                  </HelperText>
            )
          }

          <Button
            textColor="#fff"
            icon="account"
            mode="contained"
            onPress={sendEmail}
          >
            Send Email
          </Button>
        </View>

        <View style={{ height: 20 }} />

        <Text 
          style={{color: theme.colors.primary}}
          onPress={() => navigation.goBack()}
        >
          Back to login
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
