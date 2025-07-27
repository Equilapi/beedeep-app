import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NewInspectionModal = ({ visible, onClose, onSave, hiveName }) => {
  const [inspectionData, setInspectionData] = useState({
    date: '',
    observations: '',
    queenStatus: 'Buena',
    broodStatus: 'Normal',
    honeyStatus: 'Adecuada',
    healthStatus: 'Saludable',
  });

  const handleSave = () => {
    if (!inspectionData.date.trim()) {
      Alert.alert('Error', 'Por favor ingresa la fecha de inspección');
      return;
    }
    
    onSave(inspectionData);
    resetForm();
  };

  const handleCancel = () => {
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setInspectionData({
      date: '',
      observations: '',
      queenStatus: 'Buena',
      broodStatus: 'Normal',
      honeyStatus: 'Adecuada',
      healthStatus: 'Saludable',
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nueva Inspección</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Ionicons name="close" size={24} color="#7f8c8d" />
            </TouchableOpacity>
          </View>

          {hiveName && (
            <View style={styles.hiveInfo}>
              <Text style={styles.hiveName}>{hiveName}</Text>
            </View>
          )}

          <ScrollView style={styles.modalBody}>
            {/* Fecha de Inspección */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Fecha de Inspección</Text>
              <TextInput
                style={styles.textInput}
                placeholder="DD-MM-YYYY"
                value={inspectionData.date}
                onChangeText={(text) => setInspectionData({...inspectionData, date: text})}
              />
            </View>

            {/* Estado de la Reina */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Estado de la Reina</Text>
              <View style={styles.statusOptions}>
                {['Buena', 'Regular', 'Mala'].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusOption,
                      inspectionData.queenStatus === status && styles.selectedStatusOption
                    ]}
                    onPress={() => setInspectionData({...inspectionData, queenStatus: status})}
                  >
                    <Text style={[
                      styles.statusOptionText,
                      inspectionData.queenStatus === status && styles.selectedStatusOptionText
                    ]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Estado de la Cría */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Estado de la Cría</Text>
              <View style={styles.statusOptions}>
                {['Excelente', 'Normal', 'Escasa'].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusOption,
                      inspectionData.broodStatus === status && styles.selectedStatusOption
                    ]}
                    onPress={() => setInspectionData({...inspectionData, broodStatus: status})}
                  >
                    <Text style={[
                      styles.statusOptionText,
                      inspectionData.broodStatus === status && styles.selectedStatusOptionText
                    ]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Estado de la Miel */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Estado de la Miel</Text>
              <View style={styles.statusOptions}>
                {['Adecuada', 'Escasa', 'Excesiva'].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusOption,
                      inspectionData.honeyStatus === status && styles.selectedStatusOption
                    ]}
                    onPress={() => setInspectionData({...inspectionData, honeyStatus: status})}
                  >
                    <Text style={[
                      styles.statusOptionText,
                      inspectionData.honeyStatus === status && styles.selectedStatusOptionText
                    ]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Estado de Salud */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Estado de Salud</Text>
              <View style={styles.statusOptions}>
                {['Saludable', 'Regular', 'Crítico'].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusOption,
                      inspectionData.healthStatus === status && styles.selectedStatusOption
                    ]}
                    onPress={() => setInspectionData({...inspectionData, healthStatus: status})}
                  >
                    <Text style={[
                      styles.statusOptionText,
                      inspectionData.healthStatus === status && styles.selectedStatusOptionText
                    ]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Observaciones */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Observaciones</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Escribe tus observaciones aquí..."
                value={inspectionData.observations}
                onChangeText={(text) => setInspectionData({...inspectionData, observations: text})}
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Guardar Inspección</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  hiveInfo: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  hiveName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3498db',
    textAlign: 'center',
  },
  modalBody: {
    padding: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  statusOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusOption: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  selectedStatusOption: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  statusOptionText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  selectedStatusOptionText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  cancelButton: {
    flex: 0.48,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  cancelButtonText: {
    color: '#7f8c8d',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 0.48,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#27ae60',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NewInspectionModal; 