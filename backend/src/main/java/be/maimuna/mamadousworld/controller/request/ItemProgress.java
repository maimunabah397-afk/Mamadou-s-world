package be.maimuna.mamadousworld.controller.request;

public record ItemProgress(
        String itemId, String masteryLevel, int correctCount, int incorrectCount
) {
}
