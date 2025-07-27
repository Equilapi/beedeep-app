import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const NewApiaryModal = ({ visible, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    hivesCount: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del apiario es requerido';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'La ubicación es requerida';
    }

    if (formData.hivesCount.trim() && (isNaN(formData.hivesCount) || parseInt(formData.hivesCount) <= 0)) {
      newErrors.hivesCount = 'El número de colmenas debe ser un número válido mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const apiaryData = {
        id: Date.now(), // Generar ID temporal
        name: formData.name.trim(),
        location: formData.location.trim(),
        hivesCount: formData.hivesCount.trim() ? parseInt(formData.hivesCount) : 0,
        notes: formData.notes.trim(),
        status: 'Active',
        lastInspection: new Date().toISOString().split('T')[0],
        honeyProduction: '0 kg',
      };

      onSave(apiaryData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      location: '',
      hivesCount: '',
      notes: '',
    });
    setErrors({});
    onClose();
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Agregar Nuevo Apiario</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Información del Apiario</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nombre del Apiario *</Text>
                <TextInput
                  style={[styles.textInput, errors.name && styles.inputError]}
                  value={formData.name}
                  onChangeText={(value) => updateFormData('name', value)}
                  placeholder="Ej: Apiario Principal"
                  placeholderTextColor="#bdc3c7"
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Ubicación *</Text>
                <TextInput
                  style={[styles.textInput, errors.location && styles.inputError]}
                  value={formData.location}
                  onChangeText={(value) => updateFormData('location', value)}
                  placeholder="Ej: Campo Norte, Finca Los Pinos"
                  placeholderTextColor="#bdc3c7"
                />
                {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Número de Colmenas (Opcional)</Text>
                <TextInput
                  style={[styles.textInput, errors.hivesCount && styles.inputError]}
                  value={formData.hivesCount}
                  onChangeText={(value) => updateFormData('hivesCount', value)}
                  placeholder="Ej: 10"
                  placeholderTextColor="#bdc3c7"
                  keyboardType="numeric"
                />
                {errors.hivesCount && <Text style={styles.errorText}>{errors.hivesCount}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notas (Opcional)</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={formData.notes}
                  onChangeText={(value) => updateFormData('notes', value)}
                  placeholder="Información adicional sobre el apiario..."
                  placeholderTextColor="#bdc3c7"
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Información Adicional</Text>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Estado:</Text>
                <Text style={styles.infoValue}>Activo</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Última Inspección:</Text>
                <Text style={styles.infoValue}>Hoy</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Producción de Miel:</Text>
                <Text style={styles.infoValue}>0 kg</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Guardar Apiario</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
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
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#2c3e50',
    backgroundColor: '#f8f9fa',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#e74c3c',
    backgroundColor: '#fdf2f2',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
  },
  infoSection: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cancelButtonText: {
    color: '#7f8c8d',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NewApiaryModal; 