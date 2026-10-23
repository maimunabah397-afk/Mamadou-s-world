// src/api/client.js
import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8080'; // move to .env (VITE_API_BASE_URL) when you deploy

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (res) => res,
    (err) => {
        const message = err.response?.data?.error || err.message || 'Request failed';
        return Promise.reject(new Error(message));
    }
);

export default apiClient;