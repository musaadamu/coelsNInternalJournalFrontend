import axios from 'axios';

// Determine the correct base URL based on environment
const getBaseUrl = () => {
  // For production (Vercel deployment)
  if (process.env.NODE_ENV === 'production') {
    return 'https://coelsn-backend.onrender.com/api';
  }
  // For local development
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
};

// Log the API base URL for debugging
const apiBaseUrl = getBaseUrl();
console.log('API Base URL:', apiBaseUrl);

// Add a function to check if we're using the production API
export const isProduction = () => apiBaseUrl.includes('coelsn-backend.onrender.com');

// Create axios instance with base URL
const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000, // Increase timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // Disable sending cookies with cross-origin requests to avoid CORS issues
});

// Log configuration for debugging
console.log('API Configuration:', {
  baseURL: apiBaseUrl,
  withCredentials: false
});

// Request interceptor to inject token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is a 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear the token if it's invalid
      localStorage.removeItem('authToken');

      // Get the current path
      const currentPath = window.location.pathname;

      // List of protected paths that should redirect to login
      const protectedPaths = [
        '/dashboard',
        '/updateprofile',
        '/journals/uploads',
        '/manage-journals'
      ];

      // Only redirect to login for protected routes
      const shouldRedirect = protectedPaths.some(path => currentPath.startsWith(path));

      if (shouldRedirect) {
        console.log('Unauthorized access to protected route, redirecting to login');
        window.location.href = '/login';
      } else {
        console.log('Unauthorized access to public route, not redirecting');
      }
    }
    return Promise.reject(error);
  }
);

// Helper methods for authentication
api.auth = {
  // Try both endpoint patterns for better compatibility
  login: (credentials) => {
    console.log('Attempting login with credentials:', credentials);
    return api.post('/login', credentials)
      .catch(error => {
        console.log('Login failed at /login, trying /api/auth/login');
        return api.post('/api/auth/login', credentials);
      });
  },
  register: (userData) => {
    console.log('Attempting registration with data:', userData);
    return api.post('/register', userData)
      .catch(error => {
        console.log('Registration failed at /register, trying /api/auth/register');
        return api.post('/api/auth/register', userData);
      });
  },
  profile: () => {
    return api.get('/me')
      .catch(error => {
        console.log('Profile fetch failed at /me, trying /api/auth/me');
        return api.get('/api/auth/me');
      });
  },
  updateProfile: (userData) => {
    return api.put('/profile', userData)
      .catch(error => {
        console.log('Profile update failed at /profile, trying /api/auth/profile');
        return api.put('/api/auth/profile', userData);
      });
  },
  forgotPassword: (email) => {
    return api.post('/forgot-password', { email })
      .catch(error => {
        console.log('Forgot password failed at /forgot-password, trying /api/auth/forgot-password');
        return api.post('/api/auth/forgot-password', { email });
      });
  },
  resetPassword: (token, password) => {
    return api.post(`/reset-password/${token}`, { password })
      .catch(error => {
        console.log('Reset password failed at /reset-password, trying /api/auth/reset-password');
        return api.post(`/api/auth/reset-password/${token}`, { password });
      });
  },
  checkAdmin: async () => {
    try {
      const response = await api.get('/me')
        .catch(error => {
          console.log('Admin check failed at /me, trying /api/auth/me');
          return api.get('/api/auth/me');
        });
      return response.data?.user?.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }
};

// Helper methods for journals
api.journals = {
  getAll: (params) => api.get('/journals', { params }),
  getById: (id) => api.get(`/journals/${id}`),
  download: async (id, fileType) => {
    // Create headers without problematic CORS headers
    const headers = {
      'Accept': '*/*',
      'Cache-Control': 'no-cache'
    };

    // Determine the correct base URL based on environment
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://coelsn-backend.onrender.com'
      : 'http://localhost:5000';

    console.log('Using base URL for download:', baseUrl);

    // Try multiple URLs in sequence
    const urls = [
      // Direct download URL (most reliable)
      `${baseUrl}/api/journals/${id}/direct-download/${fileType}`,
      // Fallback to regular download URL
      `${baseUrl}/api/journals/${id}/download/${fileType}`
    ];

    // Try each URL in sequence
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`Attempting download from URL (${i+1}/${urls.length}):`, url);

      try {
        // Use axios directly instead of the api instance to bypass baseURL
        const response = await axios({
          method: 'GET',
          url: url,
          responseType: 'blob',
          headers,
          timeout: 120000, // 120 seconds timeout for downloads
          withCredentials: false, // Disable cookies for cross-origin requests
          maxRedirects: 5, // Allow redirects
          validateStatus: status => status < 400 // Accept any successful status
        });

        // If successful, return the response
        console.log(`Download successful from URL: ${url}`);
        return response;
      } catch (error) {
        console.error(`Download failed from URL ${url}:`, error);

        // If this is the last URL, throw the error
        if (i === urls.length - 1) {
          throw error;
        }
        // Otherwise, continue to the next URL
      }
    }

    // This should never be reached due to the error handling above
    throw new Error('All download attempts failed');
  },
  upload: async (formData) => {
    // Determine the correct base URL based on environment
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://coelsn-backend.onrender.com'
      : 'http://localhost:5000';

    console.log('Using base URL for upload:', baseUrl);

    // Use axios directly instead of the api instance to ensure correct base URL
    return axios({
      method: 'POST',
      url: `${baseUrl}/api/journals`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      timeout: 60000, // 60 seconds timeout for uploads
      withCredentials: false // Disable cookies for cross-origin requests
    });
  }
};

// Helper methods for submissions
api.submissions = {
  getAll: (params) => api.get('/submissions', { params }),
  getById: (id) => api.get(`/submissions/${id}`),
  download: async (id, fileType) => {
    // Create headers without problematic CORS headers
    const headers = {
      'Accept': '*/*',
      'Cache-Control': 'no-cache'
    };

    // Determine the correct base URL based on environment
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://coelsn-backend.onrender.com'
      : 'http://localhost:5000';

    console.log('Using base URL for submission download:', baseUrl);

    // Try multiple URLs in sequence
    const urls = [
      // Direct download URL (most reliable)
      `${baseUrl}/api/submissions/${id}/direct-download/${fileType}`,
      // Fallback to regular download URL
      `${baseUrl}/api/submissions/${id}/download/${fileType}`
    ];

    // Try each URL in sequence
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`Attempting submission download from URL (${i+1}/${urls.length}):`, url);

      try {
        // Use axios directly instead of the api instance to bypass baseURL
        const response = await axios({
          method: 'GET',
          url: url,
          responseType: 'blob',
          headers,
          timeout: 120000, // 120 seconds timeout for downloads
          withCredentials: false, // Disable cookies for cross-origin requests
          maxRedirects: 5, // Allow redirects
          validateStatus: status => status < 400 // Accept any successful status
        });

        // If successful, return the response
        console.log(`Submission download successful from URL: ${url}`);
        return response;
      } catch (error) {
        console.error(`Submission download failed from URL ${url}:`, error);

        // If this is the last URL, throw the error
        if (i === urls.length - 1) {
          throw error;
        }
        // Otherwise, continue to the next URL
      }
    }

    // This should never be reached due to the error handling above
    throw new Error('All submission download attempts failed');
  },
  updateStatus: (id, status) => api.patch(`/submissions/${id}/status`, { status }),
  delete: (id) => api.delete(`/submissions/${id}`)
};

export default api;
export const baseURL = api.defaults.baseURL;
