import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NewApiaryModal } from '../components/modals';

const ApiariesScreen = ({ navigation }) => {
  const [apiaries, setApiaries] = useState([
    {
      id: 1,
      name: 'Main Apiary',
      location: 'North Field',
      hivesCount: 24,
      status: 'Active',
      lastInspection: '2024-01-15', 
      honeyProduction: '45 kg',
    }
  ]);

  const [showNewApiaryModal, setShowNewApiaryModal] = useState(false);

  const totalHives = apiaries.reduce((sum, apiary) => sum + apiary.hivesCount, 0);
  const totalHoney = apiaries.reduce((sum, apiary) => sum + parseInt(apiary.honeyProduction), 0);

  const handleApiaryPress = (apiary) => {
    console.log('Navigating to ApiaryDetail with apiary:', apiary);
    try {
      navigation.navigate('ApiaryDetail', { apiary });
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'No se pudo navegar al detalle del apiario');
    }
  };

  const handleAddNewApiary = () => {
    setShowNewApiaryModal(true);
  };

  const handleSaveNewApiary = (newApiary) => {
    setApiaries(prev => [...prev, newApiary]);
    Alert.alert('Éxito', 'Apiario agregado correctamente');
  };

  const handleCloseModal = () => {
    setShowNewApiaryModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Apiaries Management</Text>
          <Text style={styles.headerSubtitle}>Monitor your bee colonies</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{totalHives}</Text>
            <Text style={styles.summaryLabel}>Total Hives</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{apiaries.length}</Text>
            <Text style={styles.summaryLabel}>Apiaries</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{totalHoney}kg</Text>
            <Text style={styles.summaryLabel}>Total Honey</Text>
          </View>
        </View>

        {/* Apiaries List */}
        <View style={styles.apiariesSection}>
          <Text style={styles.sectionTitle}>Your Apiaries</Text>
          
          {apiaries.map((apiary) => (
            <TouchableOpacity
              key={apiary.id}
              style={styles.apiaryCard}
              onPress={() => handleApiaryPress(apiary)}
            >
              <View style={styles.apiaryHeader}>
                <Text style={styles.apiaryName}>{apiary.name}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: apiary.status === 'Active' ? '#27ae60' : '#e74c3c' }
                ]}>
                  <Text style={styles.statusText}>{apiary.status}</Text>
                </View>
              </View>
              
              <View style={styles.apiaryInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Location:</Text>
                  <Text style={styles.infoValue}>{apiary.location}</Text>
                </View>
                
                <View style={styles.hivesSection}>
                  <View style={styles.hivesCard}>
                    <Text style={styles.hivesNumber}>{apiary.hivesCount}</Text>
                    <Text style={styles.hivesLabel}>Hives</Text>
                  </View>
                  
                  <View style={styles.honeyInfo}>
                    <Text style={styles.honeyLabel}>Honey Production</Text>
                    <Text style={styles.honeyAmount}>{apiary.honeyProduction}</Text>
                  </View>
                </View>
                
                <View style={styles.inspectionInfo}>
                  <Text style={styles.inspectionLabel}>Last Inspection:</Text>
                  <Text style={styles.inspectionDate}>{apiary.lastInspection}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleAddNewApiary}>
              <Text style={styles.actionButtonText}>Add New Apiary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Schedule Inspection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <NewApiaryModal
        visible={showNewApiaryModal}
        onClose={handleCloseModal}
        onSave={handleSaveNewApiary}
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
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  summarySection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
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
  apiariesSection: {
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
  apiaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  apiaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  apiaryName: {
    fontSize: 18,
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
  apiaryInfo: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  infoValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  hivesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  hivesCard: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 20,
  },
  hivesNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  hivesLabel: {
    fontSize: 12,
    color: '#ffffff',
  },
  honeyInfo: {
    flex: 1,
  },
  honeyLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  honeyAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  inspectionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  inspectionLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  inspectionDate: {
    fontSize: 12,
    color: '#2c3e50',
    fontWeight: '500',
  },
  actionsSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ApiariesScreen; 