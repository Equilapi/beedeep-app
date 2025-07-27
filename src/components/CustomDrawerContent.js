import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            props.onLogout();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🐝</Text>
          </View>
          <Text style={styles.headerTitle}>BeeDeep</Text>
          <Text style={styles.headerSubtitle}>Gestión de Apiarios</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userEmail}>usuario@ejemplo.com</Text>
            <Text style={styles.userRole}>Apicultor</Text>
          </View>
        </View>
        
        <View style={styles.drawerItems}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪 Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    marginBottom: 10,
    alignItems: 'center',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoIcon: {
    fontSize: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 15,
  },
  userInfo: {
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    width: '100%',
  },
  userEmail: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  userRole: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  drawerItems: {
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomDrawerContent; 