package be.maimuna.mamadousworld.repository;

import be.maimuna.mamadousworld.domain.Mastery;
import be.maimuna.mamadousworld.domain.MasteryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MasteryRepository extends JpaRepository<Mastery, MasteryId> {
    List<Mastery> findByIdChildId(UUID childId);
    List<Mastery> findByIdChildIdAndIdCategoryId(UUID childId, String categoryId);

}
