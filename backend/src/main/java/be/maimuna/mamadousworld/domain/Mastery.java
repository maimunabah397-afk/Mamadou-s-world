package be.maimuna.mamadousworld.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.Instant;


@Entity
@Table(name = "mastery")
@Data
public class Mastery {
    @EmbeddedId
    private MasteryId id;

    private int correctCount = 0;
    private int incorrectCount = 0;
    private Instant lastSeen;
}
