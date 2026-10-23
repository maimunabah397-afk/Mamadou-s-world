package be.maimuna.mamadousworld.service;

import be.maimuna.mamadousworld.controller.response.RoundResponse;
import be.maimuna.mamadousworld.domain.CategoryItem;
import be.maimuna.mamadousworld.domain.Mastery;
import be.maimuna.mamadousworld.repository.CategoryItemRepository;
import be.maimuna.mamadousworld.repository.MasteryRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoundService {

    private final MasteryRepository masteryRepo;
    private final CategoryItemRepository categoryItemRepo;
    private final Random random = new Random();

    public RoundService(MasteryRepository masteryRepo, CategoryItemRepository categoryItemRepo) {
        this.masteryRepo = masteryRepo;
        this.categoryItemRepo = categoryItemRepo;
    }

    public RoundResponse selectNextRound(UUID sessionId, UUID childId, String categoryId, int roundNumber, int totalRounds) {
        List<CategoryItem> allItems = categoryItemRepo.findByCategoryId(categoryId);
        if (allItems.isEmpty()) throw new IllegalArgumentException("Unknown category: " + categoryId);

        Map<String, Mastery> masteryMap = new HashMap<>();
        for (Mastery m : masteryRepo.findByIdChildIdAndIdCategoryId(childId, categoryId)) {
            masteryMap.put(m.getId().getLetterId(), m);
        }

        CategoryItem target = weightedPick(allItems, masteryMap);
        List<CategoryItem> distractors = pickDistractors(target, allItems, 2);

        List<CategoryItem> options = new ArrayList<>(distractors);
        options.add(target);
        Collections.shuffle(options);

        return new RoundResponse(sessionId, target.getId(), options, roundNumber, totalRounds);
    }

    public List<CategoryItem> getItems(String categoryId) {
        List<CategoryItem> items = categoryItemRepo.findByCategoryId(categoryId);
        if (items.isEmpty()) {
            throw new IllegalArgumentException("Unknown category: " + categoryId);
        }
        return items;
    }

    private CategoryItem weightedPick(List<CategoryItem> items, Map<String, Mastery> mastery) {
        List<Double> weights = new ArrayList<>();
        double totalWeight = 0;
        for (CategoryItem item : items) {
            double w = computeWeight(mastery.get(item.getId()));
            weights.add(w);
            totalWeight += w;
        }

        double r = random.nextDouble() * totalWeight;
        for (int i = 0; i < items.size(); i++) {
            r -= weights.get(i);
            if (r <= 0) return items.get(i);
        }
        return items.get(items.size() - 1);
    }

    private double computeWeight(Mastery m) {
        if (m == null) return 10.0;
        int total = m.getCorrectCount() + m.getIncorrectCount();
        if (total == 0) return 10.0;
        double accuracy = (double) m.getCorrectCount() / total;
        return Math.max(1.0, (1 - accuracy) * 10);
    }

    private List<CategoryItem> pickDistractors(CategoryItem target, List<CategoryItem> items, int count) {
        List<CategoryItem> candidates = new ArrayList<>(items);
        candidates.removeIf(i -> i.getId().equals(target.getId()));
        Collections.shuffle(candidates);
        return candidates.subList(0, Math.min(count, candidates.size()));
    }
        }

