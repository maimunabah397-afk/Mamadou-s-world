package be.maimuna.mamadousworld.controller.request;

public record RecordAnswerRequest(
        String letterId,
        Boolean correct
) {
}
