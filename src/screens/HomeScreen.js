import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  console.log('HomeScreen - navigation disponible:', !!navigation);
  console.log('HomeScreen - rutas disponibles:', navigation?.getState()?.routeNames);
  
  const [dashboardData] = useState({
    totalHives: 50,
    totalApiaries: 3,
    lastActivity: {
      date: '2024-01-20',
      type: 'Inspección de colmena',
      apiary: 'Main Apiary',
      hive: 'Colmena A-1'
    },
    estimatedHarvest: 153,
    recentActivities: [
      {
        id: 1,
        type: 'Inspección',
        apiary: 'Main Apiary',
        hive: 'Colmena A-1',
        date: '2024-01-20',
        status: 'Completada'
      },
      {
        id: 2,
        type: 'Cosecha',
        apiary: 'Mountain Apiary',
        hive: 'Colmena B-3',
        date: '2024-01-18',
        status: 'Completada'
      },
      {
        id: 3,
        type: 'Alimentación',
        apiary: 'Garden Apiary',
        hive: 'Colmena C-2',
        date: '2024-01-15',
        status: 'Completada'
      }
    ]
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'Inspección':
        return 'eye';
      case 'Cosecha':
        return 'water';
      case 'Alimentación':
        return 'leaf';
      default:
        return 'checkmark-circle';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'Inspección':
        return '#3498db';
      case 'Cosecha':
        return '#f39c12';
      case 'Alimentación':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Bienvenido de vuelta!</Text>
        <Text style={styles.dateText}>{formatDate(new Date())}</Text>
      </View>

      {/* Main Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Ionicons name="bee" size={32} color="#f4511e" />
          </View>
          <Text style={styles.statNumber}>{dashboardData.totalHives}</Text>
          <Text style={styles.statLabel}>Total Colmenas</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Ionicons name="home" size={32} color="#3498db" />
          </View>
          <Text style={styles.statNumber}>{dashboardData.totalApiaries}</Text>
          <Text style={styles.statLabel}>Apiarios Registrados</Text>
        </View>
      </View>

      {/* Harvest Estimate */}
      <View style={styles.harvestSection}>
        <View style={styles.harvestCard}>
          <View style={styles.harvestIcon}>
            <Text style={styles.honeyIcon}>🍯</Text>
          </View>
          <View style={styles.harvestInfo}>
            <Text style={styles.harvestAmount}>{dashboardData.estimatedHarvest} kg</Text>
            <Text style={styles.harvestLabel}>Cosecha Estimada Total</Text>
          </View>
        </View>
      </View>

      {/* Last Activity */}
      <View style={styles.lastActivitySection}>
        <Text style={styles.sectionTitle}>Última Actividad</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <Ionicons name="eye" size={24} color="#3498db" />
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityType}>{dashboardData.lastActivity.type}</Text>
            <Text style={styles.activityLocation}>{dashboardData.lastActivity.apiary} - {dashboardData.lastActivity.hive}</Text>
            <Text style={styles.activityDate}>{formatDate(dashboardData.lastActivity.date)}</Text>
          </View>
        </View>
      </View>

      {/* Recent Activities */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Actividades Recientes</Text>
        {dashboardData.recentActivities.map((activity) => (
          <View key={activity.id} style={styles.recentActivityCard}>
            <View style={[
              styles.activityTypeIcon,
              { backgroundColor: getActivityColor(activity.type) }
            ]}>
              <Ionicons name={getActivityIcon(activity.type)} size={20} color="#fff" />
            </View>
            <View style={styles.recentActivityInfo}>
              <Text style={styles.recentActivityType}>{activity.type}</Text>
              <Text style={styles.recentActivityLocation}>{activity.apiary} - {activity.hive}</Text>
              <Text style={styles.recentActivityDate}>{formatDate(activity.date)}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{activity.status}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              console.log('Intentando navegar a ApiariesScreen');
              try {
                navigation.navigate('ApiariesScreen');
              } catch (error) {
                console.error('Error navegando a ApiariesScreen:', error);
              }
            }}
          >
            <Ionicons name="bee" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Ver Apiarios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Nueva Actividad</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#f4511e',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  harvestSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  harvestCard: {
    backgroundColor: '#f39c12',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  harvestIcon: {
    marginRight: 15,
  },
  honeyIcon: {
    fontSize: 40,
  },
  harvestInfo: {
    flex: 1,
  },
  harvestAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  harvestLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  lastActivitySection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  activityCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityIcon: {
    marginRight: 15,
  },
  activityInfo: {
    flex: 1,
  },
  activityType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  activityLocation: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  activityDate: {
    fontSize: 12,
    color: '#95a5a6',
  },
  recentSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  recentActivityCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  activityTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  recentActivityInfo: {
    flex: 1,
  },
  recentActivityType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 3,
  },
  recentActivityLocation: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  recentActivityDate: {
    fontSize: 11,
    color: '#95a5a6',
  },
  statusBadge: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  actionsSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 12,
    flex: 0.48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HomeScreen; 