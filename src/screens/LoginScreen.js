import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Logo from '../components/Logo';
import PasswordInput from '../components/PasswordInput';
import GoogleIcon from '../components/GoogleIcon';
import { GOOGLE_CONFIG } from '../config/googleAuth';

// Configurar WebBrowser para el flujo de autenticación
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Configuración para Google OAuth
  const googleConfig = {
    clientId: GOOGLE_CONFIG.CLIENT_ID,
    scopes: GOOGLE_CONFIG.SCOPES,
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'beedeep-app',
    }),
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(googleConfig);

  // Manejar respuesta de Google Sign-In
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleLoginSuccess(authentication);
    }
  }, [response]);

  const handleGoogleLoginSuccess = async (authentication) => {
    try {
      // Aquí puedes hacer una llamada a tu backend para verificar el token
      // Por ahora simulamos el login exitoso
      const mockUserData = {
        email: 'usuario@gmail.com', // Esto vendría del token de Google
        name: 'Usuario Google',
        provider: 'google',
      };
      
      onLogin(mockUserData);
    } catch (error) {
      Alert.alert('Error', 'Error al iniciar sesión con Google. Inténtalo de nuevo.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await promptAsync();
    } catch (error) {
      Alert.alert('Error', 'Error al iniciar sesión con Google. Inténtalo de nuevo.');
      setIsGoogleLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        // Aquí iría la lógica de autenticación
        // Por ahora simulamos un delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Llamar a la función de login del AuthNavigator
        onLogin(formData);
      } catch (error) {
        Alert.alert('Error', 'Error al iniciar sesión. Inténtalo de nuevo.');
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
          <Logo size="large" />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>¡Bienvenido!</Text>
          <Text style={styles.subtitleText}>Inicia sesión para continuar</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.textInput, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              placeholder="tu@email.com"
              placeholderTextColor="#bdc3c7"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <PasswordInput
              label="Contraseña"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              error={errors.password}
            />
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.forgotPasswordButton}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Separador */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>o</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Botón de Google Sign-In */}
          <TouchableOpacity 
            style={[styles.googleButton, isGoogleLoading && styles.googleButtonDisabled]}
            onPress={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            <View style={styles.googleButtonContent}>
              <GoogleIcon size={20} />
              <Text style={styles.googleButtonText}>
                {isGoogleLoading ? 'Conectando...' : 'Continuar con Google'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ¿No tienes una cuenta?{' '}
            <Text 
              style={styles.linkText}
              onPress={() => navigation.navigate('Register')}
            >
              Regístrate aquí
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
    marginBottom: 50,
  },
  formContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
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
  loginButton: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPasswordButton: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  linkText: {
    color: '#f4511e',
    fontWeight: '600',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e9ecef',
  },
  separatorText: {
    marginHorizontal: 15,
    color: '#7f8c8d',
    fontSize: 14,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginBottom: 20,
  },
  googleButtonDisabled: {
    opacity: 0.6,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen; 