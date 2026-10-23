package be.maimuna.mamadousworld.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "category_items")
@Data
@IdClass(CategoryItemId.class)
public class CategoryItem {
    @Id
    private String id;

    @Id
    @Column(name = "category_id")
    private String categoryId;

    @Column(name = "display_text")
    private String displayText;

    @Column(name = "speak_text")
    private String speakText;

    @Column(name = "speech_type")
    private String speechType;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "color_hex")
    private String colorHex;
}
