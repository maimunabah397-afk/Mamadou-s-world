import apiClient from './client';

export async function getProgress(childId, categoryId) {
    const { data } = await apiClient.get(`/api/children/${childId}/categories/${categoryId}/progress`);
    return data; // { totalItems, masteredCount, items, stillPracticing, lastPracticed }
}