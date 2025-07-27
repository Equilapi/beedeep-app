import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Logo from '../components/Logo';
import PasswordInput from '../components/PasswordInput';

const NewPasswordScreen = ({ navigation, route }) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Obtener el token de la ruta (si existe)
  const token = route?.params?.token;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'La nueva contraseña es requerida';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'La contraseña debe tener al menos 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirma tu nueva contraseña';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveNewPassword = async () => {
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Aquí iría la lógica para cambiar la contraseña
        // Por ahora simulamos un delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        Alert.alert(
          'Contraseña Actualizada',
          'Tu contraseña ha sido actualizada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navegar de vuelta al login
                navigation.navigate('Login');
              },
            },
          ]
        );
      } catch (error) {
        Alert.alert('Error', 'No se pudo actualizar la contraseña. Inténtalo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    }
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Logo size="medium" />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Nueva Contraseña</Text>
          <Text style={styles.subtitle}>
            Establece una nueva contraseña segura para tu cuenta
          </Text>

          <View style={styles.passwordRequirements}>
            <Text style={styles.requirementsTitle}>Requisitos de la contraseña:</Text>
            <Text style={styles.requirementItem}>• Mínimo 6 caracteres</Text>
            <Text style={styles.requirementItem}>• Al menos una letra mayúscula</Text>
            <Text style={styles.requirementItem}>• Al menos una letra minúscula</Text>
            <Text style={styles.requirementItem}>• Al menos un número</Text>
          </View>

          <View style={styles.inputGroup}>
            <PasswordInput
              label="Nueva Contraseña"
              value={formData.newPassword}
              onChangeText={(value) => updateFormData('newPassword', value)}
              error={errors.newPassword}
            />
          </View>

          <View style={styles.inputGroup}>
            <PasswordInput
              label="Confirmar Nueva Contraseña"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              error={errors.confirmPassword}
            />
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
            onPress={handleSaveNewPassword}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ¿Recordaste tu contraseña?{' '}
            <Text 
              style={styles.linkText}
              onPress={() => navigation.navigate('Login')}
            >
              Inicia sesión aquí
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  passwordRequirements: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#f4511e',
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  requirementItem: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    alignItems: 'center',
    padding: 10,
  },
  backButtonText: {
    color: '#7f8c8d',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#7f8c8d',
    fontSize: 14,
    textAlign: 'center',
  },
  linkText: {
    color: '#f4511e',
    fontWeight: '600',
  },
});

export default NewPasswordScreen; 