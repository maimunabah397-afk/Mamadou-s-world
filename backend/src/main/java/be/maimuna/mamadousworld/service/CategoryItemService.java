package be.maimuna.mamadousworld.service;


import be.maimuna.mamadousworld.domain.CategoryItem;
import be.maimuna.mamadousworld.repository.CategoryItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryItemService {

    private final CategoryItemRepository categoryItemRepo;

    public CategoryItemService(CategoryItemRepository categoryItemRepo) {
        this.categoryItemRepo = categoryItemRepo;
    }

    public List<CategoryItem> getItems(String categoryId) {
        List<CategoryItem> items = categoryItemRepo.findByCategoryId(categoryId);
        if (items.isEmpty()) {
            throw new IllegalArgumentException("Unknown category: " + categoryId);
        }
        return items;
    }

}
