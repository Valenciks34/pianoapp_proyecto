import { useState, useEffect } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Appbar, Button, HelperText, Snackbar, TextInput } from "react-native-paper";

import { useChangePasswordFormValidation, useUpdatePassword } from "../../hooks";

export default function ChangePasswordScreen ({navigation}) {
  const { isLoading, error, passwordUpdated, updateUserPassword } = useUpdatePassword();
  const { form, setForm, formErrors, changePasswordFormIsValid } = useChangePasswordFormValidation();

  const [showSnackbar, setShowSnackbar] = useState(false);

  const changePassword = () => {
    if(isLoading) return;

    Keyboard.dismiss();

    if(!changePasswordFormIsValid()) return;

    updateUserPassword(form.password, form.newPassword);
  };

  useEffect(() => {
    if(passwordUpdated || error) {
      setShowSnackbar(true);
    }
  }, [passwordUpdated, error]);

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flexGrow: 1}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.pop()} />
          <Appbar.Content title="Change Password" />
        </Appbar.Header>

        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.container}>

              <TextInput
                value={form.password}
                label="Password"
                right={<TextInput.Icon icon="lock" />}
                secureTextEntry={true}
                onChangeText={(value) => setForm({...form, password: value})}
                error={formErrors.password}
              />

              <HelperText type="error" visible={formErrors.password}>
                {formErrors.password}
              </HelperText>

              <TextInput
                value={form.newPassword}
                label="New Password"
                right={<TextInput.Icon icon="lock" />}
                secureTextEntry={true}
                onChangeText={(value) => setForm({...form, newPassword: value})}
                error={formErrors.newPassword}
              />

              <HelperText type="error" visible={formErrors.newPassword}>
                {formErrors.newPassword}
              </HelperText>

              <TextInput
                value={form.newPasswordConfirmation}
                label="New Password Confirmation"
                right={<TextInput.Icon icon="lock" />}
                secureTextEntry={true}
                onChangeText={(value) => setForm({...form, newPasswordConfirmation: value})}
                error={formErrors.newPasswordConfirmation}
              />

              <HelperText type="error" visible={formErrors.newPasswordConfirmation}>
                {formErrors.newPasswordConfirmation}
              </HelperText>

              <View style={{ height: 20 }} />

              <Button
                style={{alignSelf: "center"}} 
                onPress={changePassword} 
                mode="contained"
                loading={isLoading}
              >
                Change Password
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

        <Snackbar
          visible={showSnackbar}
          onDismiss={() => setShowSnackbar(false)}
          action={{label: 'close'}}
          duration={3000}
        >
          { error
            ? error.toString()
            : "User password updated successfully"
          }
        </Snackbar>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    // flexGrow: 1, 
    paddingTop: 20.0,
    alignItems: "center",
  },

  container: {
    width: "85%",
    alignItems: "stretch",
  },

  picker: {
    borderTopStartRadius: 4, 
    borderTopEndRadius: 4, 
    overflow: "hidden",
    borderBottomWidth: 0.7, 
  },
});