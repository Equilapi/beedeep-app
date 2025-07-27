import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ApiaryDetailScreen = ({ route, navigation }) => {
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [isApiaryInfoExpanded, setIsApiaryInfoExpanded] = useState(false);
  
  console.log('ApiaryDetailScreen - route.params:', route.params);
  
  // Verificar que route y route.params existan
  if (!route || !route.params) {
    console.log('No route params found, using default apiary');
  }
  
  const { apiary } = route?.params || {
    id: 1,
    name: 'Main Apiary',
    location: 'North Field',
    hivesCount: 5,
    status: 'Active',
    lastInspection: '2024-01-15',
    honeyProduction: '45 kg',
  };

  // Datos de las colmenas
  const hives = [
    {
      id: 1,
      name: 'Colmena A-1',
      hiveId: 'HIVE-001',
      incorporationDate: '15-01-2023',
      notes: 'Colmena fuerte con buena producción de miel. Reina joven y activa.',
      status: 'Activo',
      lastInspection: '15-01-2024',
      honeyProduction: '12 kg',
      queenAge: '2 años',
      framesCount: 10,
      broodFrames: 6,
      honeyFrames: 4
    },
    {
      id: 2,
      name: 'Colmena A-2',
      hiveId: 'HIVE-002',
      incorporationDate: '20-03-2023',
      notes: 'Colmena que requiere atención. Posible reemplazo de reina.',
      status: 'Crítico',
      lastInspection: '10-01-2024',
      honeyProduction: '8 kg',
      queenAge: '1 año',
      framesCount: 8,
      broodFrames: 3,
      honeyFrames: 5
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo': return '#27ae60';
      case 'Crítico': return '#e74c3c';
      case 'Muerta': return '#7f8c8d';
      default: return '#7f8c8d';
    }
  };

  const getFilteredHives = () => {
    switch (activeFilter) {
      case 'Activas':
        return hives.filter(hive => hive.status === 'Activo');
      case 'Críticas':
        return hives.filter(hive => hive.status === 'Crítico');
      case 'Muertas':
        return hives.filter(hive => hive.status === 'Muerta');
      default:
        return hives;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('ApiariesScreen')}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{apiary.name}</Text>
          <Text style={styles.headerSubtitle}>{apiary.location}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Detalle del Apiario</Text>

        {/* Información desplegable del apiario */}
        <View style={styles.collapsibleSection}>
          <TouchableOpacity 
            style={styles.collapsibleHeader}
            onPress={() => setIsApiaryInfoExpanded(!isApiaryInfoExpanded)}
          >
            <Text style={styles.collapsibleTitle}>Información del Apiario</Text>
            <Ionicons 
              name={isApiaryInfoExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#7f8c8d" 
            />
          </TouchableOpacity>
          
          {isApiaryInfoExpanded && (
            <View style={styles.collapsibleContent}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Apiario:</Text>
                <Text style={styles.infoValue}>{apiary.name}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Ubicación:</Text>
                <Text style={styles.infoValue}>{apiary.location}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Colmenas:</Text>
                <Text style={styles.infoValue}>{apiary.hivesCount}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Estado:</Text>
                <Text style={styles.infoValue}>{apiary.status}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Última inspección:</Text>
                <Text style={styles.infoValue}>{apiary.lastInspection}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Producción de miel:</Text>
                <Text style={styles.infoValue}>{apiary.honeyProduction}</Text>
              </View>
            </View>
          )}
        </View>
        
        
        {/* Resumen de colmenas */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {hives.filter(hive => hive.status === 'Activo').length}
            </Text>
            <Text style={styles.summaryLabel}>Activas</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {hives.filter(hive => hive.status === 'Crítico').length}
            </Text>
            <Text style={styles.summaryLabel}>Críticas</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {hives.filter(hive => hive.status === 'Muerta').length}
            </Text>
            <Text style={styles.summaryLabel}>Muertas</Text>
          </View>
        </View>
        
        {/* Total de colmenas */}
        <View style={styles.totalSection}>
          <View style={styles.totalCard}>
            <Text style={styles.totalNumber}>{hives.length}</Text>
            <Text style={styles.totalLabel}>Total Colmenas</Text>
          </View>
        </View>
        
        
        <View style={styles.hivesSection}>
          <Text style={styles.hivesTitle}>Listado de Colmenas</Text>
          
          {/* Tabs de filtro */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterTabsContainer}
          >
            <TouchableOpacity 
              style={[styles.filterTab, activeFilter === 'Todas' && styles.activeFilterTab]}
              onPress={() => setActiveFilter('Todas')}
            >
              <Text style={[styles.filterTabText, activeFilter === 'Todas' && styles.activeFilterTabText]}>
                Todas ({hives.length})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.filterTab, activeFilter === 'Activas' && styles.activeFilterTab]}
              onPress={() => setActiveFilter('Activas')}
            >
              <Text style={[styles.filterTabText, activeFilter === 'Activas' && styles.activeFilterTabText]}>
                Activas ({hives.filter(hive => hive.status === 'Activo').length})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.filterTab, activeFilter === 'Críticas' && styles.activeFilterTab]}
              onPress={() => setActiveFilter('Críticas')}
            >
              <Text style={[styles.filterTabText, activeFilter === 'Críticas' && styles.activeFilterTabText]}>
                Críticas ({hives.filter(hive => hive.status === 'Crítico').length})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.filterTab, activeFilter === 'Muertas' && styles.activeFilterTab]}
              onPress={() => setActiveFilter('Muertas')}
            >
              <Text style={[styles.filterTabText, activeFilter === 'Muertas' && styles.activeFilterTabText]}>
                Muertas ({hives.filter(hive => hive.status === 'Muerta').length})
              </Text>
            </TouchableOpacity>
          </ScrollView>
          
          {getFilteredHives().map((hive) => (
            <TouchableOpacity 
              key={hive.id} 
              style={styles.hiveCard}
              onPress={() => navigation.navigate('HiveDetail', { hive, apiary })}
            >
              <View style={styles.hiveHeader}>
                <Text style={styles.hiveName}>{hive.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(hive.status) }]}>
                  <Text style={styles.statusText}>{hive.status}</Text>
                </View>
              </View>
              
              <View style={styles.hiveInfo}>
                <View style={styles.hiveInfoRow}>
                  <Text style={styles.hiveInfoLabel}>Última revisión:</Text>
                  <Text style={styles.hiveInfoValue}>{hive.lastInspection}</Text>
                </View>
                
                <View style={styles.hiveInfoRow}>
                  <Text style={styles.hiveInfoLabel}>Producción de miel:</Text>
                  <Text style={styles.hiveInfoValue}>{hive.honeyProduction}</Text>
                </View>
                
                <View style={styles.hiveInfoRow}>
                  <Text style={styles.hiveInfoLabel}>Edad de la reina:</Text>
                  <Text style={styles.hiveInfoValue}>{hive.queenAge}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#f4511e',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 10,
    textAlign: 'center',
  },
  hivesSection: {
    marginTop: 30,
    width: '100%',
  },
  hivesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  hiveCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hiveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hiveName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  hiveInfo: {
    flex: 'auto',
  },
  hiveInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  hiveInfoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  hiveInfoValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    flex: 0.3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  filterTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    overflow: 'scroll',
    
  },
  filterTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  activeFilterTab: {
    backgroundColor: '#f4511e',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activeFilterTabText: {
    color: '#fff',
  },
  totalSection: {
    marginTop: 20,
    width: '100%',
  },
  totalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  totalNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  collapsibleSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  collapsibleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  collapsibleContent: {
    paddingTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  filterTabsContainer: {
    marginBottom: 20,
    width: '100%',
  },
});

export default ApiaryDetailScreen; 