package be.maimuna.mamadousworld.repository;

import be.maimuna.mamadousworld.domain.CategoryItem;
import be.maimuna.mamadousworld.domain.CategoryItemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryItemRepository extends JpaRepository<CategoryItem, CategoryItemId> {
    List<CategoryItem> findByCategoryId(String categoryId);
}
