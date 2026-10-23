package be.maimuna.mamadousworld.service;

import be.maimuna.mamadousworld.controller.response.AnswerResponse;
import be.maimuna.mamadousworld.domain.QuizSession;
import be.maimuna.mamadousworld.repository.QuizeSessionRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;
import java.util.UUID;

@Service
public class SessionService {

    private final QuizeSessionRepository sessionRepo;
    private final Random random = new Random();

    private static final List<String> CORRECT_MESSAGES =
            List.of("Yes!", "You got it!", "Awesome!", "Great job!", "That's right!");

    public SessionService(QuizeSessionRepository sessionRepo) {
        this.sessionRepo = sessionRepo;
    }

    public QuizSession startSession(UUID childId, String categoryId) {
        QuizSession session = new QuizSession();
        session.setChildId(childId);
        session.setCategoryId(categoryId);
        return sessionRepo.save(session);
    }

    public QuizSession getOwnedSessionOrThrow(UUID sessionId, UUID childId) {
        QuizSession s = sessionRepo.findById(sessionId)
                .orElseThrow(() -> new NoSuchElementException("Session not found"));
        if (!s.getChildId().equals(childId)) {
            throw new NoSuchElementException("Session not found");
        }
        return s;
    }

    public String randomCorrectMessage() {
        return CORRECT_MESSAGES.get(random.nextInt(CORRECT_MESSAGES.size()));
    }

    public AnswerResponse recordRoundResult(QuizSession session, boolean correct, String correctId) {
        session.setRoundsCompleted(session.getRoundsCompleted() + 1);

        if (correct) {
            session.setCurrentStreak(session.getCurrentStreak() + 1);
            session.setBestStreak(Math.max(session.getBestStreak(), session.getCurrentStreak()));
        } else {
            session.setCurrentStreak(0);
        }

        boolean complete = session.getRoundsCompleted() >= session.getTotalRounds();
        if (complete) session.setCompletedAt(Instant.now());
        sessionRepo.save(session);

        String message = correct ? randomCorrectMessage() : "Try again!";

        return new AnswerResponse(
                correct, correctId, message,
                session.getCurrentStreak(), complete,
                session.getRoundsCompleted(), session.getTotalRounds()
        );
    }

}
