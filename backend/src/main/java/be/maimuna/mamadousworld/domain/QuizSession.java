package be.maimuna.mamadousworld.domain;


import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "quiz_sessions")
@Data
public class QuizSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID childId;
    private String categoryId;
    private int totalRounds = 10;
    private int roundsCompleted = 0;
    private int currentStreak = 0;
    private int bestStreak = 0;
    private Instant startedAt = Instant.now();
    private Instant completedAt;

}
