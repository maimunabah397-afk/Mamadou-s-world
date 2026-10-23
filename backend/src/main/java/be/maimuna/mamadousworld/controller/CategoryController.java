package be.maimuna.mamadousworld.controller;

import be.maimuna.mamadousworld.controller.request.AnswerRequest;
import be.maimuna.mamadousworld.controller.response.AnswerResponse;
import be.maimuna.mamadousworld.controller.response.ProgressResponse;
import be.maimuna.mamadousworld.controller.response.RoundResponse;
import be.maimuna.mamadousworld.controller.response.SessionResponse;
import be.maimuna.mamadousworld.domain.CategoryItem;
import be.maimuna.mamadousworld.domain.QuizSession;
import be.maimuna.mamadousworld.service.ChildService;
import be.maimuna.mamadousworld.service.MasteryService;
import be.maimuna.mamadousworld.service.RoundService;
import be.maimuna.mamadousworld.service.SessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/children/{childId}/categories/{categoryId}")
public class CategoryController {
    private final RoundService roundService;
    private final MasteryService masteryService;
    private final ChildService childService;
    private final SessionService sessionService;

    public CategoryController(RoundService roundService, MasteryService masteryService,
                              ChildService childService, SessionService sessionService) {
        this.roundService = roundService;
        this.masteryService = masteryService;
        this.childService = childService;
        this.sessionService = sessionService;
    }

    @PostMapping("/sessions")
    public ResponseEntity<SessionResponse> startSession(
            @PathVariable UUID childId,
            @PathVariable String categoryId,
            Authentication auth) {
        UUID parentId = (UUID) auth.getPrincipal();
        childService.getOwnedChildOrThrow(childId, parentId);
        QuizSession session = sessionService.startSession(childId, categoryId);
        return ResponseEntity.ok(new SessionResponse(session.getId(), session.getTotalRounds()));
    }

    @GetMapping("/sessions/{sessionId}/next-round")
    public ResponseEntity<RoundResponse> nextRound(
            @PathVariable UUID childId,
            @PathVariable String categoryId,
            @PathVariable UUID sessionId,
            Authentication auth) {
        UUID parentId = (UUID) auth.getPrincipal();
        childService.getOwnedChildOrThrow(childId, parentId);
        QuizSession session = sessionService.getOwnedSessionOrThrow(sessionId, childId);

        if (session.getCompletedAt() != null) {
            throw new IllegalStateException("Session already complete");
        }

        return ResponseEntity.ok(roundService.selectNextRound(
                sessionId, childId, categoryId,
                session.getRoundsCompleted() + 1, session.getTotalRounds()));
    }

    @PostMapping("/sessions/{sessionId}/rounds/{targetId}/answer")
    public ResponseEntity<AnswerResponse> answer(
            @PathVariable UUID childId,
            @PathVariable String categoryId,
            @PathVariable UUID sessionId,
            @PathVariable String targetId,
            @RequestBody AnswerRequest req,
            Authentication auth) {
        UUID parentId = (UUID) auth.getPrincipal();
        childService.getOwnedChildOrThrow(childId, parentId);
        QuizSession session = sessionService.getOwnedSessionOrThrow(sessionId, childId);

        boolean correct = targetId.equals(req.selectedId());
        masteryService.recordAnswer(parentId, childId, categoryId, targetId, correct);
        AnswerResponse response = sessionService.recordRoundResult(session, correct, targetId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/progress")
    public ResponseEntity<ProgressResponse> getProgress(
            @PathVariable UUID childId,
            @PathVariable String categoryId,
            Authentication auth) {
        UUID parentId = (UUID) auth.getPrincipal();
        childService.getOwnedChildOrThrow(childId, parentId);
        return ResponseEntity.ok(masteryService.getProgress(childId, categoryId));
    }


}
