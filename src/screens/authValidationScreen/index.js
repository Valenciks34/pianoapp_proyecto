import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function AuthValidationScreen({navigation}) {
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if(user) {
      navigation.dispatch(StackActions.replace('Home'));
    } else {
      navigation.dispatch(StackActions.replace('Login'));
    }
  },[]);

  /* No necesario porque se uso redux-persist y no la persistencia de firebaseAuth */
  // const loadUser = async (fbuser) => {
  //   const userDoc = doc(db, "users", fbuser.uid);
  //
  //   const snapshot = await getDoc(userDoc, user);
  //
  //   const user = snapshot.data();
  //
  //   dispatch(setUser(user));
  //
  //   navigation.dispatch(StackActions.replace('Home'));
  // }
  
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
