import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Logo = ({ size = 'large', showSubtitle = true }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { iconSize: 40, titleSize: 20, subtitleSize: 12 };
      case 'medium':
        return { iconSize: 60, titleSize: 24, subtitleSize: 14 };
      case 'large':
      default:
        return { iconSize: 80, titleSize: 32, subtitleSize: 16 };
    }
  };

  const { iconSize, titleSize, subtitleSize } = getSize();

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { width: iconSize, height: iconSize }]}>
        <Text style={[styles.icon, { fontSize: iconSize * 0.6 }]}>🐝</Text>
      </View>
      <Text style={[styles.title, { fontSize: titleSize }]}>BeeDeep</Text>
      {showSubtitle && (
        <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>
          Gestión de Apiarios
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 50,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default Logo; 