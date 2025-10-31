import { Slot, useRouter, useSegments } from "expo-router";
import './../style/globals.css';
import { useEffect } from "react";
import axios from 'axios';
import { createContext, useState } from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";

export const AuthContext = createContext({
  isAuthenticated: true,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

axios.defaults.baseURL = 'https://localhost:8000/api/';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const segments = useSegments();
  const router = useRouter();

  // useEffect(() => {
  //   const inAuthGroup = segments[0] === 'auth';

  //   if (!isAuthenticated && !inAuthGroup) {
  //     setTimeout(() => {
  //       router.replace('/auth/login');
  //     }, 0);
  //   } else if (isAuthenticated && inAuthGroup) {
  //     setTimeout(() => {
  //       router.replace('/');
  //     }, 0);
  //   }
  // }, [isAuthenticated, segments]);

  return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </AuthContext.Provider>
  );
}