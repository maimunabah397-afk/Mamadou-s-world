import apiClient from './client';

export async function getCategoryItems(categoryId) {
    const { data } = await apiClient.get(`/api/categories/${categoryId}/items`);
    return data;
}