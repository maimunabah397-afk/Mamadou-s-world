package be.maimuna.mamadousworld.domain;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Setter
@Getter
public class MasteryId implements Serializable {
    private UUID childId;
    private String categoryId;
    private String letterId;

    public MasteryId() {}

    public MasteryId(UUID childId, String categoryId, String letterId) {
        this.childId = childId;
        this.categoryId = categoryId;
        this.letterId = letterId;
    }

    public MasteryId(UUID childId, String letterId) {
    }

    // getters/setters

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MasteryId that)) return false;
        return Objects.equals(childId, that.childId)
                && Objects.equals(categoryId, that.categoryId)
                && Objects.equals(letterId, that.letterId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(childId, categoryId, letterId);
    }

}
