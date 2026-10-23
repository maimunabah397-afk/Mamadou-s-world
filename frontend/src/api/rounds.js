import apiClient from './client';

export async function startSession(childId, categoryId) {
    const { data } = await apiClient.post(`/api/children/${childId}/categories/${categoryId}/sessions`);
    return data; // { sessionId, totalRounds }
}

export async function getNextRound(childId, categoryId, sessionId) {
    const { data } = await apiClient.get(
        `/api/children/${childId}/categories/${categoryId}/sessions/${sessionId}/next-round`
    );
    return data; // { sessionId, targetId, options, roundNumber, totalRounds }
}

export async function submitAnswer(childId, categoryId, sessionId, targetId, selectedId) {
    const { data } = await apiClient.post(
        `/api/children/${childId}/categories/${categoryId}/sessions/${sessionId}/rounds/${targetId}/answer`,
        { selectedId }
    );
    return data; // { correct, correctId, message, currentStreak, sessionComplete, roundsCompleted, totalRounds }
}