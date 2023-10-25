import { useEffect } from "react";
import { StyleSheet,Image,View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, HelperText, TextInput, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

import { useRegister, useRegisterFormValidation } from "./hooks";
import { StackActions } from "@react-navigation/native";

const RegisterScreen = ({ navigation }) => {
  const { isLoading, error, data, registerWithEmailAndPassword } = useRegister();
  
  const { form, setForm, formErrors, registerFormIsValid } = useRegisterFormValidation();
  
  const theme = useTheme();
  
  useEffect(() => {
    if(data) {
      navigation.dispatch(StackActions.replace('Home'));
    }
  }, [data]);

  const register = async () => {
    if(isLoading) return;

    Keyboard.dismiss();

    if(!registerFormIsValid()) return;

    registerWithEmailAndPassword(form.email, form.password);
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
        
        <Text variant="titleLarge">REGISTER SCREEN</Text>

        <View style={{ height: 25 }} />

        <View style = {{ width:250 }}>
          <TextInput
            label="Email"
            value={form.email}
            maxLength={50}
            onChangeText={(email) => setForm({...form, email})}
            error={formErrors.email}
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
            error={formErrors.password}
          />

          <HelperText HelperText type="error" visible={formErrors.password}>
            {formErrors.password}
          </HelperText>

          {error && 
            <HelperText type="error" style={{textAlign: "center", paddingBottom: 10}}>
              {error.toString()}
            </HelperText>
          }

          <View style={{ height: 1 }} />

          <Button
            textColor="#fff"
            icon={"account"}
            mode="contained"
            onPress={register}
            loading={isLoading}
          >
            Register
          </Button>

          <View style={{ height: 10 }} />

          <Text 
            variant="labelLarge"
            style = {{color: theme.colors.primary, textAlign: "center", textDecorationLine:'underline'}}
            onPress={() => navigation.goBack()}
          >
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
