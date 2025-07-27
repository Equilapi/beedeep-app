import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NewInspectionModal } from '../components/modals';

const HiveDetailScreen = ({ route, navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isInspectionModalVisible, setIsInspectionModalVisible] = useState(false);
  
  console.log('HiveDetailScreen - route.params:', route.params);
  
  // Verificar que route y route.params existan
  if (!route || !route.params) {
    console.log('No route params found, using default hive');
  }
  
  const { hive, apiary } = route?.params || {
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
  };

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };
  
  const handleNewInspection = () => {
    setIsInspectionModalVisible(true);
  };

  const handleSaveInspection = (inspectionData) => {
    // Aquí se implementaría la lógica para guardar la inspección
    console.log('Datos de inspección:', inspectionData);
    Alert.alert('Éxito', 'Inspección registrada correctamente');
    setIsInspectionModalVisible(false);
  };

  const handleCloseInspectionModal = () => {
    setIsInspectionModalVisible(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo': return '#27ae60';
      case 'Crítico': return '#e74c3c';
      case 'Muerta': return '#7f8c8d';
      default: return '#7f8c8d';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            if (apiary) {
              navigation.navigate('ApiaryDetail', { apiary });
            } else {
              navigation.goBack();
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{hive.name}</Text>
          <Text style={styles.headerSubtitle}>Detalle de la Colmena</Text>
        </View>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEditPress}
        >
          <Ionicons name="create-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Información Principal */}
        <View style={styles.mainInfoSection}>
          <View style={styles.hiveNameCard}>
            <Text style={styles.hiveName}>{hive.name}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(hive.status) }
            ]}>
              <Text style={styles.statusText}>{hive.status}</Text>
            </View>
          </View>
        </View>

        {/* Detalles de la Colmena */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Información de la Colmena</Text>
          
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="id-card-outline" size={20} color="#3498db" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>🆔 ID o Número Interno</Text>
                <Text style={styles.detailValue}>{hive.hiveId}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="calendar-outline" size={20} color="#e74c3c" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>📅 Fecha de Incorporación</Text>
                <Text style={styles.detailValue}>{hive.incorporationDate}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="document-text-outline" size={20} color="#f39c12" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>📝 Notas Generales</Text>
                <Text style={styles.detailValue}>{hive.notes}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Información Adicional */}
        <View style={styles.additionalSection}>
          <Text style={styles.sectionTitle}>Información Adicional</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{hive.honeyProduction}</Text>
              <Text style={styles.statLabel}>Producción de Miel</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{hive.queenAge}</Text>
              <Text style={styles.statLabel}>Edad de la Reina</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{hive.framesCount}</Text>
              <Text style={styles.statLabel}>Total de Marcos</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{hive.broodFrames}</Text>
              <Text style={styles.statLabel}>Marcos de Cría</Text>
            </View>
          </View>
        </View>

        {/* Última Inspección */}
        <View style={styles.inspectionSection}>
          <Text style={styles.sectionTitle}>Última Inspección</Text>
          <View style={styles.inspectionCard}>
            <Text style={styles.inspectionDate}>{hive.lastInspection}</Text>
            <TouchableOpacity style={styles.scheduleButton}>
              <Text style={styles.scheduleButtonText}>Programar Inspección</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Acciones Rápidas */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleNewInspection}
            >
              <Ionicons name="add-circle-outline" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Nueva Inspección</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="analytics-outline" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Ver Historial</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal de Nueva Inspección */}
      <NewInspectionModal
        visible={isInspectionModalVisible}
        onClose={handleCloseInspectionModal}
        onSave={handleSaveInspection}
        hiveName={hive.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3498db',
    paddingTop: 50,
  },
  backButton: {
    marginRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ecf0f1',
  },
  editButton: {
    marginLeft: 15,
  },
  content: {
    padding: 20,
  },
  mainInfoSection: {
    marginBottom: 20,
  },
  hiveNameCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  hiveName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  detailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: 15,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  additionalSection: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  inspectionSection: {
    marginBottom: 20,
  },
  inspectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inspectionDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  scheduleButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scheduleButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  actionsSection: {
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 12,
    flex: 0.48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HiveDetailScreen; 