package be.maimuna.mamadousworld.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.AnyDiscriminatorImplicitValues;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "childrens")
@Data
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID parentId;

    @Column(nullable = false)
    private String nickname;

    private String avatar;
    private Instant createdAt = Instant.now();

}
