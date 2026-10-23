package be.maimuna.mamadousworld.controller;


import be.maimuna.mamadousworld.controller.request.ChildRequest;
import be.maimuna.mamadousworld.domain.Child;
import be.maimuna.mamadousworld.service.ChildService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/children")
public class ChildController {

    private final ChildService childService;

    public ChildController(ChildService childService) {
        this.childService = childService;
    }

    @PostMapping
    public ResponseEntity<Child> create(@Valid @RequestBody ChildRequest req, Authentication auth) {
        UUID parentId = (UUID) auth.getPrincipal();   // set by JwtAuthFilter
        return ResponseEntity.ok(childService.createChild(parentId, req.nickname(), req.avatar()));
    }

    @GetMapping
    public ResponseEntity<List<Child>> list(Authentication auth) {
        UUID parentId = (UUID) auth.getPrincipal();
        return ResponseEntity.ok(childService.listChildren(parentId));
    }
}
