package be.maimuna.mamadousworld.repository;

import be.maimuna.mamadousworld.domain.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChildRepository extends JpaRepository<Child, UUID> {
    List<Child> findByParentId(UUID parentId);
}
