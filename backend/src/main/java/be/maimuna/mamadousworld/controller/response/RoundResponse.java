package be.maimuna.mamadousworld.controller.response;

import be.maimuna.mamadousworld.domain.CategoryItem;

import java.util.List;
import java.util.UUID;

public record RoundResponse(

        UUID sessionId, String targetId, List<CategoryItem> options,
        int roundNumber, int totalRounds

) {
}
