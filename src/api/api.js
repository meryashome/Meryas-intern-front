import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000', // Your NestJS backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to add the JWT token to request headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken'); // Retrieve the JWT from localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Attach JWT token to request header
    }
    return config;
});

export default api;
