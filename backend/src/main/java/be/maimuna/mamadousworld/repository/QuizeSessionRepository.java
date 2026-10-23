package be.maimuna.mamadousworld.repository;

import be.maimuna.mamadousworld.domain.QuizSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface QuizeSessionRepository extends JpaRepository<QuizSession, UUID> {
}
