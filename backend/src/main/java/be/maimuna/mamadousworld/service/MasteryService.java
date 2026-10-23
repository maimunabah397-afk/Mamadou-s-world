package be.maimuna.mamadousworld.service;

import be.maimuna.mamadousworld.controller.request.ItemProgress;
import be.maimuna.mamadousworld.controller.response.ProgressResponse;
import be.maimuna.mamadousworld.domain.CategoryItem;
import be.maimuna.mamadousworld.domain.Mastery;
import be.maimuna.mamadousworld.domain.MasteryId;
import be.maimuna.mamadousworld.repository.CategoryItemRepository;
import be.maimuna.mamadousworld.repository.MasteryRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MasteryService {

    private final MasteryRepository masteryRepo;
    private final ChildService childService;
    private final CategoryItemRepository categoryItemRepo;

    public MasteryService(MasteryRepository masteryRepo, ChildService childService,
                          CategoryItemRepository categoryItemRepo) {
        this.masteryRepo = masteryRepo;
        this.childService = childService;
        this.categoryItemRepo = categoryItemRepo;
    }

    public void recordAnswer(UUID parentId, UUID childId, String categoryId, String letterId, boolean correct) {
        childService.getOwnedChildOrThrow(childId, parentId);

        MasteryId id = new MasteryId(childId, categoryId, letterId);
        Mastery m = masteryRepo.findById(id).orElseGet(() -> {
            Mastery fresh = new Mastery();
            fresh.setId(id);
            return fresh;
        });

        if (correct) m.setCorrectCount(m.getCorrectCount() + 1);
        else m.setIncorrectCount(m.getIncorrectCount() + 1);
        m.setLastSeen(Instant.now());

        masteryRepo.save(m);
    }

    public List<Mastery> getMastery(UUID parentId, UUID childId, String categoryId) {
        childService.getOwnedChildOrThrow(childId, parentId);
        return masteryRepo.findByIdChildIdAndIdCategoryId(childId, categoryId);
    }

    public ProgressResponse getProgress(UUID childId, String categoryId) {
        List<CategoryItem> allItems = categoryItemRepo.findByCategoryId(categoryId);

        Map<String, Mastery> masteryMap = masteryRepo.findByIdChildIdAndIdCategoryId(childId, categoryId)
                .stream()
                .collect(Collectors.toMap(m -> m.getId().getLetterId(), m -> m));

        List<ItemProgress> progressList = new ArrayList<>();
        List<String> stillPracticing = new ArrayList<>();
        int masteredCount = 0;
        Instant lastPracticed = null;

        for (CategoryItem item : allItems) {
            Mastery m = masteryMap.get(item.getId());
            String level = classify(m);

            int correct = m != null ? m.getCorrectCount() : 0;
            int incorrect = m != null ? m.getIncorrectCount() : 0;

            progressList.add(new ItemProgress(item.getId(), level, correct, incorrect));

            if (level.equals("mastered")) masteredCount++;
            if (level.equals("learning")) stillPracticing.add(item.getId());

            if (m != null && m.getLastSeen() != null) {
                if (lastPracticed == null || m.getLastSeen().isAfter(lastPracticed)) {
                    lastPracticed = m.getLastSeen();
                }
            }
        }

        return new ProgressResponse(allItems.size(), masteredCount, progressList, stillPracticing, lastPracticed);
    }

    private String classify(Mastery m) {
        if (m == null) return "not_started";
        int total = m.getCorrectCount() + m.getIncorrectCount();
        if (total == 0) return "not_started";

        double accuracy = (double) m.getCorrectCount() / total;
        if (m.getCorrectCount() >= 3 && accuracy >= 0.8) return "mastered";
        return "learning";
    }
}
