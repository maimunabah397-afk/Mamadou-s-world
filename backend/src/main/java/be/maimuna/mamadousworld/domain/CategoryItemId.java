package be.maimuna.mamadousworld.domain;

import java.io.Serializable;
import java.util.Objects;

public class CategoryItemId implements Serializable {

    private String id;
    private String categoryId;

    public CategoryItemId() {}
    public CategoryItemId(String id, String categoryId) {
        this.id = id;
        this.categoryId = categoryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CategoryItemId that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(categoryId, that.categoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, categoryId);
    }
}
