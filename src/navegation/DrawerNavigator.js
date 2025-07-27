import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native';

// Importar las pantallas
import HomeScreen from '../screens/HomeScreen';
import ApiariesScreen from '../screens/ApiariesScreen';
import ApiaryDetailScreen from '../screens/ApiaryDetailScreen';
import HiveDetailScreen from '../screens/HiveDetailScreen';
import HarvestScreen from '../screens/HarvestScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import DrawerIcons from '../components/DrawerIcons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ onLogout }) => {
  return (
    <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} onLogout={onLogout} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveTintColor: '#f4511e',
          drawerInactiveTintColor: '#666',
          drawerStyle: {
            backgroundColor: '#fff',
            width: 240,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Inicio',
            drawerLabel: 'Inicio',
            drawerIcon: ({ color, size }) => (
              <DrawerIcons.Home color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="ApiariesScreen"
          component={ApiariesScreen}
          options={{
            title: 'Apiarios',
            drawerLabel: 'Apiarios',
            drawerIcon: ({ color, size }) => (
              <DrawerIcons.Apiaries color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Harvest"
          component={HarvestScreen}
          options={{
            title: 'Cosechas',
            drawerLabel: 'Cosechas',
            drawerIcon: ({ color, size }) => (
              <DrawerIcons.Harvest color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="ApiaryDetail"
          component={ApiaryDetailScreen}
          options={{
            title: 'Detalle del Apiario',
            headerShown: true,
            drawerItemStyle: { display: 'none' }, // Ocultar del menú del drawer
          }}
        />
        <Drawer.Screen
          name="HiveDetail"
          component={HiveDetailScreen}
          options={{
            title: 'Detalle de la Colmena',
            headerShown: true,
            drawerItemStyle: { display: 'none' }, // Ocultar del menú del drawer
          }}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            title: 'Configuración',
            drawerLabel: 'Configuración',
            drawerIcon: ({ color, size }) => (
              <DrawerIcons.Settings color={color} size={size} />
            ),
          }}
        >
          {(props) => <SettingsScreen {...props} onLogout={onLogout} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Mi Perfil',
            drawerLabel: 'Mi Perfil',
            drawerIcon: ({ color, size }) => (
              <DrawerIcons.Profile color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator; 