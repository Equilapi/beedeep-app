import React from 'react';
import { Text } from 'react-native';

const DrawerIcons = {
  Home: ({ color, size }) => (
    <Text style={{ color, fontSize: size }}>🏠</Text>
  ),
  Apiaries: ({ color, size }) => (
    <Text style={{ color, fontSize: size }}>🏡</Text>
  ),
  Harvest: ({ color, size }) => (
    <Text style={{ color, fontSize: size }}>🍯</Text>
  ),
  Settings: ({ color, size }) => (
    <Text style={{ color, fontSize: size }}>⚙️</Text>
  ),
  Profile: ({ color, size }) => (
    <Text style={{ color, fontSize: size }}>👤</Text>
  ),
};

export default DrawerIcons; 