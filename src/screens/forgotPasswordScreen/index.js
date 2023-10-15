import { Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Button, HelperText, Snackbar, TextInput, useTheme } from "react-native-paper";

import { useRestorePassword, useRestorePasswordFormValidation } from "./hooks";

export default function ForgotPasswordScreen({navigation}) {
  const { isLoading, error, emailSent, restorePassword } = useRestorePassword();
  
  const { form, setForm, formErrors, restorePasswordFormIsValid } = useRestorePasswordFormValidation();
  
  const theme = useTheme();

  const sendRestorePasswordEmail = async () => {
    if(isLoading) return;

    Keyboard.dismiss();

    if(!restorePasswordFormIsValid()) return;

    restorePassword(form.email);
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
            value={form.email}
            maxLength={50}
            onChangeText={(email) => setForm({...form, email})}
          />

          <HelperText type="error" visible={formErrors.email}>
            {formErrors.email}
          </HelperText>

          {error && 
            <HelperText type="error" style={{textAlign: "center", paddingBottom: 10}}>
              {error.toString()}
            </HelperText>
          }

          <Button
            textColor="#fff"
            icon="account"
            mode="contained"
            loading={isLoading}
            onPress={sendRestorePasswordEmail}
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

        <Snackbar
          visible={emailSent}
          duration={3000}
          onDismiss={() => {}}
        >
          ¡Email de recuperacion enviado exitosamente 🎉!
        </Snackbar>
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
