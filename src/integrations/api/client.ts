
import axios from 'axios';

export const API_URL = 'https://thebeachplayers.com';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Improving CORS handling with more comprehensive headers
    'Referrer-Policy': 'no-referrer-when-downgrade',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  },
  // Increasing timeout for slower networks
  timeout: 15000,
  // CORS settings
  withCredentials: false // Changed to false as it can cause CORS issues with '*' origin
});

// Interceptor para adicionar token de autenticação
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // For multipart/form-data requests, don't set content-type to allow browser to set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    // Adicionando identificador único para cada requisição para debug
    config.headers['X-Request-Id'] = `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Log para debug
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, 
      { headers: { ...config.headers, Authorization: token ? 'Bearer [REDACTED]' : undefined }, 
        requestId: config.headers['X-Request-Id'] });
    
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Interceptor para logging de respostas
apiClient.interceptors.response.use(
  (response) => {
    // Log para debug
    console.log(`[API Response] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
      { requestId: response.config.headers['X-Request-Id'] });
    return response;
  },
  (error) => {
    // Log detalhado de erros
    if (error.response) {
      console.error(`[API Error] ${error.response.status} ${error.config?.method?.toUpperCase()} ${error.config?.url}:`, 
        error.response.data, { requestId: error.config?.headers['X-Request-Id'] });
    } else if (error.request) {
      console.error('[API Error] No response received:', error.request, 
        { requestId: error.config?.headers['X-Request-Id'] });
    } else {
      console.error('[API Error] Request setup error:', error.message, 
        { requestId: error.config?.headers['X-Request-Id'] });
    }
    return Promise.reject(error);
  }
);
