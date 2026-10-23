package be.maimuna.mamadousworld.controller.response;

import be.maimuna.mamadousworld.controller.request.ItemProgress;

import java.time.Instant;
import java.util.List;

public record ProgressResponse(
        int totalItems,
        int masteredCount,
        List<ItemProgress> items,
        List<String> stillPracticing,
        Instant lastPracticed
) {
}
