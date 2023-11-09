
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { useFonts } from 'expo-font';

import { name as appName } from './app.json';

import AuthValidationScreen from './src/screens/authValidationScreen/AuthValidationScreen';
import LoginScreen from './src/screens/loginScreen/LoginScreen';
import RegisterScreen from './src/screens/registerScreen/RegisterScreen';
import ForgotPasswordScreen from './src/screens/forgotPasswordScreen/ForgotPasswordScreen';
import HomeScreen  from './src/screens/homeScreen/HomeScreen';

import LessonScreen from './src/screens/lessonScreen/LessonScreen';
import LessonsScreen from './src/screens/lessonsScreen/LessonsScreen';
import LessonDetailScreen from './src/screens/lessonScreen/LessonDetailScreen';
import PracticeScreen from './src/screens/practiceScreen/PracticeScreen';
import { ProfileScreen, AccountScreen, ChangePasswordScreen, HelpScreen } from './src/screens/profileScreen/ProfileScreen';

import userReducer from './src/store/slices/userSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator(); 

const navigationRef = createNavigationContainerRef();

const queryClient = new QueryClient();

const persistConfig = { key: 'user', storage: AsyncStorage };

const rootReducer = combineReducers({user: userReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

const colors = {
  primary: "#7A9D54",
  onPrimary: "rgb(255, 255, 255)",
  primaryContainer: "rgb(194, 241, 142)",
  onPrimaryContainer: "rgb(15, 32, 0)",
  secondary: "#7A9D54",
  onSecondary: "rgb(255, 255, 255)",
  secondaryContainer: "rgb(193, 241, 143)",
  onSecondaryContainer: "rgb(14, 32, 0)",
  tertiary: "rgb(0, 106, 102)",
  onTertiary: "rgb(255, 255, 255)",
  tertiaryContainer: "rgb(112, 247, 239)",
  onTertiaryContainer: "rgb(0, 32, 30)",
  error: "rgb(186, 26, 26)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 218, 214)",
  onErrorContainer: "rgb(65, 0, 2)",
  background: "rgb(253, 252, 245)",
  onBackground: "rgb(27, 28, 24)",
  surface: "rgb(253, 252, 245)",
  onSurface: "rgb(27, 28, 24)",
  surfaceVariant: "rgb(225, 228, 213)",
  onSurfaceVariant: "rgb(68, 72, 61)",
  outline: "rgb(117, 121, 108)",
  outlineVariant: "rgb(196, 200, 186)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(48, 49, 44)",
  inverseOnSurface: "rgb(242, 241, 234)",
  inversePrimary: "rgb(166, 212, 117)",
  elevation: {
    level0: "transparent",
    level1: "rgb(244, 245, 234)",
    level2: "rgb(238, 240, 227)",
    level3: "rgb(232, 236, 221)",
    level4: "rgb(231, 234, 218)",
    level5: "rgb(227, 231, 214)"
  },
  surfaceDisabled: "rgba(27, 28, 24, 0.12)",
  onSurfaceDisabled: "rgba(27, 28, 24, 0.38)",
  backdrop: "rgba(46, 50, 40, 0.4)"
};

const App = () => {
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user){
  //       navigationRef.dispatch(StackActions.replace('Home'));
  //     }else{
  //       navigationRef.dispatch(StackActions.replace('Login'));
  //     }
  //   });
  // },[]);

  const [fontsLoaded, fontError] = useFonts({
    'w300': require('./assets/fonts/ProximaNova/Proxima-Nova-Light.otf'),
    'w400': require('./assets/fonts/ProximaNova/Proxima-Nova.otf'),
    'w500': require('./assets/fonts/ProximaNova/Proxima-Nova-Medium.otf'),
    'w600': require('./assets/fonts/ProximaNova/Proxima-Nova-Semibold.otf'),
    'w700': require('./assets/fonts/ProximaNova/Proxima-Nova-Bold.otf'),
    'w800': require('./assets/fonts/ProximaNova/Proxima-Nova-Extrabold.otf'),
    'w900': require('./assets/fonts/ProximaNova/Proxima-Nova-Black.otf'),

    'wi200': require('./assets/fonts/ProximaNova/Proxima-Nova-Thin-Italic.otf'),
    'wi300': require('./assets/fonts/ProximaNova/Proxima-Nova-Light-Italic.otf'),
    'wi400': require('./assets/fonts/ProximaNova/Proxima-Nova-Italic.otf'),
    'wi500': require('./assets/fonts/ProximaNova/Proxima-Nova-Medium-Italic.otf'),
    'wi600': require('./assets/fonts/ProximaNova/Proxima-Nova-Semibold-Italic.otf'),
    'wi700': require('./assets/fonts/ProximaNova/Proxima-Nova-Bold-Italic.otf'),
    'wi800': require('./assets/fonts/ProximaNova/Proxima-Nova-Extrabold-Italic.otf'),
    'wi900': require('./assets/fonts/ProximaNova/Proxima-Nova-Bold-Italic.otf'),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded || fontError) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // const theme = {
  //   ...DefaultTheme,
  //  
  //   fonts: {
  //     fonts: {
  //       titleLarge: {
  //         fontFamily:"w500"
  //       },
  //       headlineLarge: {
  //         fontFamily: "w500"
  //       },
  //       bodyMedium: {
  //         fontFamily: "w500"
  //       },
  //       labelLarge: {
  //         fontFamily: "w500"
  //       },
  //       labelSmall: {
  //         fontFamily: "w500"
  //       }
  //     }
  //   }
  // };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={{
            ...DefaultTheme,
            colors,
            fonts: {
              labelSmall: {
                fontFamily:"w500",
                fontSize: 11,
              },
              labelMedium: {
                fontFamily:"w500",
                fontSize: 12
              },
              labelLarge: {
                fontFamily:"w500",
                fontSize: 14
              },
              bodySmall: {
                fontFamily:"w400",
                fontSize: 12,
              },
              bodyMedium: {
                fontFamily:"w400",
                fontSize: 14,
              },
              bodyLarge: {
                fontFamily:"w400",
                fontSize: 16,
              },
              titleSmall: {
                fontFamily:"w500",
                fontSize: 14
              },
              titleMedium: {
                fontFamily:"w500",
                fontSize: 16
              },
              titleLarge: {
                fontFamily:"w400",
                fontSize: 22
              },
              headlineSmall: {
                fontFamily:"w400",
                fontSize: 24
              },
              headlineMedium: {
                fontFamily:"w400",
                fontSize: 28
              },
              headlineLarge: {
                fontFamily:"w400",
                fontSize: 32
              },
              displaySmall: {
                fontFamily:"w400",
                fontSize: 36
              },
              displayMedium: {
                fontFamily:"w400",
                fontSize: 45
              },
              displayLarge: {
                fontFamily:"w400",
                fontSize: 57
              },
            }
          }}>
            <GestureHandlerRootView style={{flex:1}}>
              <NavigationContainer ref={navigationRef}>
                <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='AuthValidation'>
                  <Stack.Screen name="AuthValidation" component={AuthValidationScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Register" component={RegisterScreen} />
                  <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Lessons" component={LessonsScreen} />
                  <Stack.Screen name="Lesson" component={LessonScreen} />
                  <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
                  <Stack.Screen name="Practice" component={PracticeScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="Account" component={AccountScreen} />
                  <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                  <Stack.Screen name="HelpScreen" component={HelpScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </GestureHandlerRootView>
          </PaperProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

AppRegistry.registerComponent(appName, () => App);