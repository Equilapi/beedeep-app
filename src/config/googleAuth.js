// Configuración para Google OAuth
// Reemplaza estos valores con los de tu proyecto de Google Cloud Console

export const GOOGLE_CONFIG = {
  // Obtén tu Client ID desde: https://console.cloud.google.com/apis/credentials
  // Para desarrollo, usa el Client ID de tipo "Web application"
  CLIENT_ID: 'TU_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  
  // Scopes que necesitamos
  SCOPES: ['openid', 'profile', 'email'],
  
  // URL de redirección (se genera automáticamente con expo-auth-session)
  REDIRECT_URI: 'beedeep-app://',
};

// Instrucciones para configurar Google OAuth:
// 1. Ve a https://console.cloud.google.com/
// 2. Crea un nuevo proyecto o selecciona uno existente
// 3. Habilita la API de Google+ 
// 4. Ve a "Credentials" y crea un "OAuth 2.0 Client ID"
// 5. Para desarrollo, usa "Web application" como tipo
// 6. Agrega "http://localhost:19006" como URI autorizada
// 7. Copia el Client ID y reemplázalo arriba 