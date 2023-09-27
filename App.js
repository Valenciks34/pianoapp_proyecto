
import React, {useEffect, useRef} from 'react';
import { NavigationContainer, StackActions, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'

import { name as appName } from './app.json';
import { store } from './src/store'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import AuthValidationScreen from './src/screens/authValidationScreen'
import LoginScreen from './src/screens/loginScreen'
import RegisterScreen from './src/screens/registerScreen';
import ForgotPasswordScreen from './src/screens/forgotPasswordScreen'
import HomeScreen  from './src/screens/homeScreen';

import LessonScreen from './src/screens/lessonScreen';
import PracticeScreen from './src/screens/practiceScreen';
import ProfileScreen from './src/screens/profileScreen';


const Stack = createNativeStackNavigator(); 

const theme = {
  ...DefaultTheme,
  colors: {
    "primary": "#7A9D54",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(194, 241, 142)",
    "onPrimaryContainer": "rgb(15, 32, 0)",
    "secondary": "#7A9D54",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(193, 241, 143)",
    "onSecondaryContainer": "rgb(14, 32, 0)",
    "tertiary": "rgb(0, 106, 102)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(112, 247, 239)",
    "onTertiaryContainer": "rgb(0, 32, 30)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(253, 252, 245)",
    "onBackground": "rgb(27, 28, 24)",
    "surface": "rgb(253, 252, 245)",
    "onSurface": "rgb(27, 28, 24)",
    "surfaceVariant": "rgb(225, 228, 213)",
    "onSurfaceVariant": "rgb(68, 72, 61)",
    "outline": "rgb(117, 121, 108)",
    "outlineVariant": "rgb(196, 200, 186)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(48, 49, 44)",
    "inverseOnSurface": "rgb(242, 241, 234)",
    "inversePrimary": "rgb(166, 212, 117)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(244, 245, 234)",
      "level2": "rgb(238, 240, 227)",
      "level3": "rgb(232, 236, 221)",
      "level4": "rgb(231, 234, 218)",
      "level5": "rgb(227, 231, 214)"
    },
    "surfaceDisabled": "rgba(27, 28, 24, 0.12)",
    "onSurfaceDisabled": "rgba(27, 28, 24, 0.38)",
    "backdrop": "rgba(46, 50, 40, 0.4)"
  }, // Copy it from the color codes scheme and then use it here
};

const navigationRef = createNavigationContainerRef();

const App = () => {

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // if(!navigationRef.isReady) return;

      if (user){
        navigationRef.dispatch(StackActions.replace('Home'));
      }else{
        navigationRef.dispatch(StackActions.replace('Login'));
      }
    });
  },[]);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='AuthValidation'>
            <Stack.Screen name="AuthValidation" component={AuthValidationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Lessons" component={LessonScreen} />
            <Stack.Screen name="Practice" component={PracticeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;

AppRegistry.registerComponent(appName, () => App);