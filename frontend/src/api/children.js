// src/api/children.js
import apiClient from './client';

export async function createChild(nickname, avatar) {
    const { data } = await apiClient.post('/api/children', { nickname, avatar });
    return data;
}

export async function listChildren() {
    const { data } = await apiClient.get('/api/children');
    return data;
}