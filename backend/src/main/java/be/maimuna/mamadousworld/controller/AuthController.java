package be.maimuna.mamadousworld.controller;

import be.maimuna.mamadousworld.controller.request.AuthResponse;
import be.maimuna.mamadousworld.controller.request.LoginRequest;
import be.maimuna.mamadousworld.controller.request.SignUpRequest;
import be.maimuna.mamadousworld.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignUpRequest req){
        String token = authService.SignUp(req.email(), req.password());
        return ResponseEntity.ok(new AuthResponse(token));

    }


    @PostMapping("login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req){
        String token = authService.login(req.email(), req.password());
        return ResponseEntity.ok(new AuthResponse(token));

    }


}
