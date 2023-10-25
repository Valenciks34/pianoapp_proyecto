import { useState, useEffect } from "react";
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import { TextInput, Button, useTheme, Appbar, Snackbar, HelperText } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";

import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useAccountFormValidation, useDateTimePicker } from "../../hooks";
import { formatLocateDate } from "../../../../utils";

export default function AccountScreen ({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const { error, isLoading, userUpdated, updateUserData } = useUpdateUser();
  const { form, setForm, formErrors, accountFormIsValid  } = useAccountFormValidation();
  const { pickedDate, showCalendar } = useDateTimePicker(new Date(user.date));
  
  const { colors } = useTheme();

  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if(pickedDate) {
      setForm({...form, date: pickedDate});
    }
  }, [pickedDate]);

  useEffect(() => {
    if(userUpdated || error) {
      setShowSnackbar(true);
    }
  }, [userUpdated, error]);

  const updateAccount = async () => {
    if(isLoading) return;

    Keyboard.dismiss();

    if(!accountFormIsValid()) return;

    updateUserData(form);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flexGrow: 1}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.pop()} />
          <Appbar.Content title="Account" />
        </Appbar.Header>

        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.container}>

              <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                <View style={{width:"48%"}}>
                  <TextInput 
                    value={form.firstName ?? user.firstName}
                    label="First Name" 
                    onChangeText={(value) => setForm({...form, firstName: value})}
                    error={formErrors.firstName}
                  />

                  <HelperText type="error" visible={formErrors.firstName}>
                    {formErrors.firstName}
                  </HelperText>
                </View>

                <View style={{width:"48%"}}>
                  <TextInput 
                    value={form.lastName ?? user.lastName}
                    label="Last Name" 
                    onChangeText={(value) => setForm({...form, lastName: value})}
                    error={formErrors.lastName}
                  />

                  <HelperText type="error" visible={formErrors.lastName}>
                    {formErrors.lastName}
                  </HelperText>
                </View>
              </View>

              <TouchableWithoutFeedback onPress={showCalendar}>
                <View>
                  <TextInput
                    editable={false}
                    value={formatLocateDate(form.date ?? user.date)}
                    label="Birthday Date"
                    right={<TextInput.Icon icon="calendar" />}
                  />
                </View>
              </TouchableWithoutFeedback>

              <View style={{ height: 20 }} />

              <TextInput
                value={form.phone ?? user.phone}
                label="Number phone"
                right={<TextInput.Icon icon="phone" />}
                keyboardType="numeric"
                onChangeText={(value) => setForm({...form, phone: value})}
                error={formErrors.phone}
              />

              <HelperText type="error" visible={formErrors.phone}>
                {formErrors.phone}
              </HelperText>

              <View style={{
                ...styles.picker, 
                backgroundColor: colors.surfaceVariant, 
                borderBottomColor: colors.onSurfaceVariant}}
              >
                <Picker
                  selectedValue={form.gender ?? user.gender}
                  placeholder=""
                  onValueChange={(value, _) => setForm({...form, gender: value})}
                >
                  <Picker.Item enabled={false} label="Select gender" value="null" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
              </View>

              <View style={{ height: 20 }} />

              <Button 
                style={{alignSelf: "center"}} 
                onPress={updateAccount} 
                mode="contained"
                loading={isLoading}
              >
                Update Profile
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
            : "User updated successfully"
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