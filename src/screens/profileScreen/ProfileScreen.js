import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme, Card, Text, List, Appbar } from "react-native-paper";
import { signOut } from "firebase/auth";
import { StackActions } from "@react-navigation/native";

import { AccountScreen, ChangePasswordScreen, HelpScreen } from './screens';
import { AvatarPicker } from './components';
import { setUser } from "../../store/slices/userSlice";
import { auth } from "../../../firebaseConfig";

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();

  const { colors } = useTheme();

  const logout = () => {
    navigation.dispatch(StackActions.replace('Login'));
    signOut(auth);
    dispatch(setUser(null));
  };

  return (
    <View style={{flexGrow:1}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          {/* Avatar & Name */}
          <View style={{alignItems: "center"}}>
            <AvatarPicker 
              userAvatar={user?.avatar}
              text={user.firstName}
              size={120}
              backgroundColor={colors.primary}
            />

            <View style={{height: 10.0}} />

            <Text 
              variant="titleLarge" 
              style={{textAlign: "center"}} 
            > 
              {user.firstName} {user.lastName}
            </Text>

            <Text 
              variant="labelSmall" 
              style={{textAlign: "center", fontFamily: "w500"}} 
            > 
              {user.firstName} {user.email}
            </Text>
          </View>

          <View style={{height: 20.0}} />

          <Card style={{overflow: "hidden"}}>
            <Card.Content 
              style={{paddingVertical:0, paddingHorizontal:0}} 
            >
              <Text variant="titleLarge" style={{textAlign: "center", paddingTop: 15.0}} > Cuenta </Text>
              
              <List.Item
                style={{overflow: "hidden"}}
                onPress={() => navigation.push("Account")}
                left={props => <List.Icon {...props} icon="account" />}
                title="Informacion de la cuenta" 
              />

              <List.Item
                style={{overflow: "hidden"}}
                onPress={() => navigation.push("ChangePassword")}
                left={props => <List.Icon {...props} icon="lock" />}
                title="Actualizar contraseña" 
              />

              <List.Item
                style={{overflow: "hidden"}}
                onPress={() => navigation.push("HelpScreen")}
                left={props => <List.Icon {...props} icon="help" />}
                title="Ayuda y soporte" 
              />

              <List.Item
                style={{overflow: "hidden"}}
                onPress={logout}
                left={props => <List.Icon {...props} icon="logout" />}
                title="Cerrar sessión" 
              />
            </Card.Content>
          </Card>

          
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: "center",
  },

  container: {
    width: "85%",
    alignItems: "stretch",
  },
});

export { ProfileScreen, AccountScreen, ChangePasswordScreen, HelpScreen };