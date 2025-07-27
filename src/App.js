import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import AuthNavigator from './navegation/AuthNavigator';

export default function App() {
  return (
    <>
      <AuthNavigator />
      <StatusBar style="auto" />
    </>
  );
}
