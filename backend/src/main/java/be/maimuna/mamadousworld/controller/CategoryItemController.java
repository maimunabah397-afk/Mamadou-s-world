package be.maimuna.mamadousworld.controller;

import be.maimuna.mamadousworld.domain.CategoryItem;
import be.maimuna.mamadousworld.service.CategoryItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryItemController {
    private final CategoryItemService categoryItemService;

    public CategoryItemController(CategoryItemService categoryItemService) {
        this.categoryItemService = categoryItemService;
    }


    @GetMapping("/{categoryId}/items")
    public ResponseEntity<List<CategoryItem>> getItems(@PathVariable String categoryId) {
        return ResponseEntity.ok(categoryItemService.getItems(categoryId));
    }


}
