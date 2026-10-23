// src/api/auth.js
import apiClient from './client';

export async function signup(email, password) {
    const { data } = await apiClient.post('/api/auth/signup', { email, password });
    return data; // { token }
}

export async function login(email, password) {
    const { data } = await apiClient.post('/api/auth/login', { email, password });
    return data;
}