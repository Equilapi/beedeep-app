import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Logo from '../components/Logo';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email.trim()) {
      setError('El email es requerido');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('El email no es válido');
      return false;
    }
    setError('');
    return true;
  };

  const handleSendResetEmail = async () => {
    if (validateEmail()) {
      setIsLoading(true);
      
      try {
        // Aquí iría la lógica para enviar el email de recuperación
        // Por ahora simulamos un delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        Alert.alert(
          'Email Enviado',
          'Se ha enviado un enlace de recuperación a tu email. Revisa tu bandeja de entrada.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
              onPress: () => navigation.goBack(),
            },
            {
              text: 'Establecer Nueva Contraseña',
              onPress: () => navigation.navigate('NewPassword', { token: 'dummy-token' }),
            },
          ]
        );
      } catch (error) {
        Alert.alert('Error', 'No se pudo enviar el email. Inténtalo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateEmail = (value) => {
    setEmail(value);
    if (error) {
      setError('');
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
          <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.subtitle}>
            No te preocupes, te enviaremos un enlace para restablecer tu contraseña.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.textInput, error && styles.inputError]}
              value={email}
              onChangeText={updateEmail}
              placeholder="tu@email.com"
              placeholderTextColor="#bdc3c7"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <TouchableOpacity 
            style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
            onPress={handleSendResetEmail}
            disabled={isLoading}
          >
            <Text style={styles.sendButtonText}>
              {isLoading ? 'Enviando...' : 'Enviar Email de Recuperación'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Volver al Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.newPasswordButton}
            onPress={() => navigation.navigate('NewPassword', { token: 'dummy-token' })}
          >
            <Text style={styles.newPasswordButtonText}>Establecer Nueva Contraseña</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ¿Recordaste tu contraseña?{' '}
            <Text 
              style={styles.linkText}
              onPress={() => navigation.goBack()}
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
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2c3e50',
    backgroundColor: '#f8f9fa',
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
  sendButton: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  sendButtonText: {
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
  newPasswordButton: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  newPasswordButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
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

export default ForgotPasswordScreen; 