package be.maimuna.mamadousworld.service;


import be.maimuna.mamadousworld.domain.Parent;
import be.maimuna.mamadousworld.repository.ParentRepository;
import be.maimuna.mamadousworld.security.JwtUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {
    private final ParentRepository parentRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthService(ParentRepository parentRepo, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.parentRepo = parentRepo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    public String SignUp(String email, String password) {
        if (parentRepo.findByEmail(email).isPresent())
            throw new IllegalStateException("email already registered");


        Parent p = new Parent();
        p.setEmail(email);
        p.setPassword(encoder.encode(password));
        p.setConsentedAt(Instant.now());
        parentRepo.save(p);

        return jwtUtil.generateToken(p.getId());


    }

    public String login(String email, String password) {
        Parent p = parentRepo.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));
        if (!encoder.matches(password, p.getPassword()))
            throw new BadCredentialsException("Invalid credentials");
        return jwtUtil.generateToken(p.getId());
    }

}