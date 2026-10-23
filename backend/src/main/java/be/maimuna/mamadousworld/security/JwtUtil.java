package be.maimuna.mamadousworld.security;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {
        private final SecretKey key;
        private final long expirationMs = 24 * 60 * 60 * 1000;

        public JwtUtil(@Value("${jwt.secret}") String secret) {
            this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        }

        public String generateToken(UUID parentId) {
            return Jwts.builder()
                    .subject(parentId.toString())
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + expirationMs))
                    .signWith(key)
                    .compact();
        }

        public UUID extractParentId(String token) {
            String subject = Jwts.parser().verifyWith(key).build()
                    .parseSignedClaims(token).getPayload().getSubject();
            return UUID.fromString(subject);
        }
    }


