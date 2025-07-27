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

const NewHarvestModal = ({ visible, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    hiveId: '',
    hiveName: '',
    honeyAmount: '',
    pollenAmount: '',
    propolisAmount: '',
    harvestDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.hiveId.trim()) {
      newErrors.hiveId = 'El ID de la colmena es requerido';
    }

    if (!formData.hiveName.trim()) {
      newErrors.hiveName = 'El nombre de la colmena es requerido';
    }

    if (!formData.honeyAmount.trim()) {
      newErrors.honeyAmount = 'La cantidad de miel es requerida';
    } else if (isNaN(formData.honeyAmount) || parseFloat(formData.honeyAmount) < 0) {
      newErrors.honeyAmount = 'La cantidad de miel debe ser un número válido mayor o igual a 0';
    }

    if (formData.pollenAmount.trim() && (isNaN(formData.pollenAmount) || parseFloat(formData.pollenAmount) < 0)) {
      newErrors.pollenAmount = 'La cantidad de polen debe ser un número válido mayor o igual a 0';
    }

    if (formData.propolisAmount.trim() && (isNaN(formData.propolisAmount) || parseFloat(formData.propolisAmount) < 0)) {
      newErrors.propolisAmount = 'La cantidad de propóleo debe ser un número válido mayor o igual a 0';
    }

    if (!formData.harvestDate.trim()) {
      newErrors.harvestDate = 'La fecha de cosecha es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const harvestData = {
        id: Date.now(), // Generar ID temporal
        hiveId: formData.hiveId.trim(),
        hiveName: formData.hiveName.trim(),
        honey: parseFloat(formData.honeyAmount) || 0,
        pollen: parseFloat(formData.pollenAmount) || 0,
        propolis: parseFloat(formData.propolisAmount) || 0,
        harvestDate: formData.harvestDate.trim(),
        notes: formData.notes.trim(),
        year: new Date(formData.harvestDate).getFullYear(),
        month: new Date(formData.harvestDate).toLocaleDateString('es-ES', { month: 'long' }),
      };

      onSave(harvestData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      hiveId: '',
      hiveName: '',
      honeyAmount: '',
      pollenAmount: '',
      propolisAmount: '',
      harvestDate: '',
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

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
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
            <Text style={styles.modalTitle}>Registrar Nueva Cosecha</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Información de la Colmena</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>ID de la Colmena *</Text>
                <TextInput
                  style={[styles.textInput, errors.hiveId && styles.inputError]}
                  value={formData.hiveId}
                  onChangeText={(value) => updateFormData('hiveId', value)}
                  placeholder="Ej: Hive-001"
                  placeholderTextColor="#bdc3c7"
                />
                {errors.hiveId && <Text style={styles.errorText}>{errors.hiveId}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nombre de la Colmena *</Text>
                <TextInput
                  style={[styles.textInput, errors.hiveName && styles.inputError]}
                  value={formData.hiveName}
                  onChangeText={(value) => updateFormData('hiveName', value)}
                  placeholder="Ej: Colmena Principal"
                  placeholderTextColor="#bdc3c7"
                />
                {errors.hiveName && <Text style={styles.errorText}>{errors.hiveName}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Fecha de Cosecha *</Text>
                <TextInput
                  style={[styles.textInput, errors.harvestDate && styles.inputError]}
                  value={formData.harvestDate}
                  onChangeText={(value) => updateFormData('harvestDate', value)}
                  placeholder="DD-MM-YYYY"
                  placeholderTextColor="#bdc3c7"
                />
                {errors.harvestDate && <Text style={styles.errorText}>{errors.harvestDate}</Text>}
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Producción</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cantidad de Miel (kg) *</Text>
                <TextInput
                  style={[styles.textInput, errors.honeyAmount && styles.inputError]}
                  value={formData.honeyAmount}
                  onChangeText={(value) => updateFormData('honeyAmount', value)}
                  placeholder="Ej: 25.5"
                  placeholderTextColor="#bdc3c7"
                  keyboardType="numeric"
                />
                {errors.honeyAmount && <Text style={styles.errorText}>{errors.honeyAmount}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cantidad de Polen (kg) (Opcional)</Text>
                <TextInput
                  style={[styles.textInput, errors.pollenAmount && styles.inputError]}
                  value={formData.pollenAmount}
                  onChangeText={(value) => updateFormData('pollenAmount', value)}
                  placeholder="Ej: 3.2"
                  placeholderTextColor="#bdc3c7"
                  keyboardType="numeric"
                />
                {errors.pollenAmount && <Text style={styles.errorText}>{errors.pollenAmount}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cantidad de Propóleo (kg) (Opcional)</Text>
                <TextInput
                  style={[styles.textInput, errors.propolisAmount && styles.inputError]}
                  value={formData.propolisAmount}
                  onChangeText={(value) => updateFormData('propolisAmount', value)}
                  placeholder="Ej: 0.8"
                  placeholderTextColor="#bdc3c7"
                  keyboardType="numeric"
                />
                {errors.propolisAmount && <Text style={styles.errorText}>{errors.propolisAmount}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notas (Opcional)</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={formData.notes}
                  onChangeText={(value) => updateFormData('notes', value)}
                  placeholder="Observaciones sobre la cosecha..."
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
                <Text style={styles.infoLabel}>Año:</Text>
                <Text style={styles.infoValue}>
                  {formData.harvestDate ? new Date(formData.harvestDate.split('-').reverse().join('-')).getFullYear() : 'N/A'}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Mes:</Text>
                <Text style={styles.infoValue}>
                  {formData.harvestDate ? new Date(formData.harvestDate.split('-').reverse().join('-')).toLocaleDateString('es-ES', { month: 'long' }) : 'N/A'}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Total Producción:</Text>
                <Text style={styles.infoValue}>
                  {((parseFloat(formData.honeyAmount) || 0) + (parseFloat(formData.pollenAmount) || 0) + (parseFloat(formData.propolisAmount) || 0)).toFixed(1)} kg
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Guardar Cosecha</Text>
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

export default NewHarvestModal; 