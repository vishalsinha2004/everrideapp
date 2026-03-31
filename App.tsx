import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from './src/screens/SplashScreen'; // <--- IMPORT SPLASH SCREEN
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import OtpScreen from './src/screens/OtpScreen';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // State to track if the splash screen is done showing
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  return (
    <>
      {/* If Splash is NOT complete, it covers the screen. When complete, it unmounts. */}
      {!isSplashComplete && (
        <SplashScreen 
          isServerReady={true} // Set this to false if you are waiting for a real API fetch!
          onComplete={() => setIsSplashComplete(true)} 
        />
      )}

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}