import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // only needed if you're using cookies
});

// Define GET routes that don’t require auth
const publicPaths = ['/api/auth/login', '/api/auth/register'];

// Add token to protected routes only
api.interceptors.request.use(
  (config) => {
    const isPublic = config.method === 'get' && publicPaths.some((prefix) => config.url.startsWith(prefix + '/') || config.url === prefix);

    if (!isPublic) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      const currentPath = window.location.pathname;

      if (currentPath.startsWith('/admin')) {
        window.location.href = '/admin/login';
      } else {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
