package be.maimuna.mamadousworld.controller.response;

public record AnswerResponse(
        boolean correct, String correctId, String message,
        int currentStreak, boolean sessionComplete, int roundsCompleted, int totalRounds
) {
}
