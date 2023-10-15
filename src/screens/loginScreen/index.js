import { useEffect } from "react";
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";
import { StyleSheet, Text, Image, View, TouchableWithoutFeedback, Keyboard } from "react-native";

import { useLogin, useLoginFormValidation } from "./hooks";
import { StackActions } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const { isLoading, error, data, loginWithEmailAndPassword } = useLogin();
  
  const { form, setForm, formErrors, loginFormIsValid } = useLoginFormValidation();

  const theme = useTheme();

  useEffect(() => {
    if(data) {
      navigation.dispatch(StackActions.replace('Home'));
    }
  }, [data]);

  const login = async () => {
    if(isLoading) return;

    Keyboard.dismiss();

    if(!loginFormIsValid()) return;

    loginWithEmailAndPassword(form.email, form.password);
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
            value={form.email}
            maxLength={50}
            onChangeText={(email) => setForm({...form, email})}
          />
          
          <HelperText type="error" visible={formErrors.email}>
            {formErrors.email}
          </HelperText>

          <TextInput
            label="Password"
            value={form.password}
            maxLength={20}
            onChangeText={(password) => setForm({...form, password})}
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

          {error && 
            <HelperText type="error" style={{textAlign: "center", paddingBottom: 10}}>
              {error.toString()}
            </HelperText>
          }

          <Button
            textColor="#fff"
            icon={"account"}
            mode="contained"
            onPress={login}
            loading={isLoading}
            //disabled={loading}
          >
            Entre
          </Button>
        </View>

        <View style={{ height: 15 }} />

        <Text
          style={{color: theme.colors.primary, textAlign: "center", textDecorationLine: 'underline'}}
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
