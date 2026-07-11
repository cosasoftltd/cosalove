import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  validateStatus: (status) => status >= 200 && status < 300,
});

// 3. Request Interceptor: Attach Token ONLY for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // Exclude auth routes from receiving the Authorization header
  const isPublicRoute = config.url?.includes('/users/register/') || 
                        config.url?.includes('/users/login/');

  if (token && !isPublicRoute) {
    config.headers.Authorization = `Token ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 4. Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("NETWORK ERROR: Server might be down or CORS is blocking the request.");
    } else {
      // Improved error display
      console.error("API ERROR:", error.response.status, JSON.stringify(error.response.data, null, 2));
    }
    return Promise.reject(error);
  }
);

export default api;