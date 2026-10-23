// src/api/mastery.js
import apiClient from './client';

export async function getMastery(childId) {
    const { data } = await apiClient.get(`/api/children/${childId}/mastery`);
    return normalizeMastery(data);
}

export async function recordAnswer(childId, letterId, correct) {
    await apiClient.post(`/api/children/${childId}/mastery`, { letterId, correct });
}

function normalizeMastery(masteryList) {
    const map = {};
    for (const m of masteryList) {
        map[m.id.letterId] = { correctCount: m.correctCount, incorrectCount: m.incorrectCount };
    }
    return map;
}