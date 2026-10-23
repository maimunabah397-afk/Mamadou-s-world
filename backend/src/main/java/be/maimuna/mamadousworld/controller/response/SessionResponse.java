package be.maimuna.mamadousworld.controller.response;

import java.util.UUID;

public record SessionResponse(
        UUID sessionId,
        int totalRounds
) {
}
