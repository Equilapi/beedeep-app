import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.log('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (userData) => {
    try {
      // Aquí guardarías el token del usuario
      await AsyncStorage.setItem('userToken', 'dummy-token');
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Error saving auth token:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Error removing auth token:', error);
    }
  };

  if (isLoading) {
    return null; // O un componente de loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          </>
        ) : (
          <Stack.Screen name="Main">
            {(props) => <DrawerNavigator {...props} onLogout={handleLogout} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator; 