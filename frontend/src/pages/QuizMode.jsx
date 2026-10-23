import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { startSession, getNextRound, submitAnswer } from '../api/rounds';
import { speak } from '../audio/speech';
import { API_BASE_URL } from '../api/client';
import Mascot from '../components/Mascot';

export default function QuizMode() {
    const { childId, categoryId } = useParams();
    const [sessionId, setSessionId] = useState(null);
    const [round, setRound] = useState(null);
    const [status, setStatus] = useState('waiting'); // waiting | checking | correct | incorrect
    const [feedback, setFeedback] = useState(null); // { message, currentStreak }
    const [sessionSummary, setSessionSummary] = useState(null); // set when session completes
    const [error, setError] = useState(null);

    const loadRound = useCallback(async (sid) => {
        try {
            const data = await getNextRound(childId, categoryId, sid);
            setRound(data);
            setStatus('waiting');
            speak(`Which one is ${data.targetId}?`);
        } catch (err) {
            setError(err.message);
        }
    }, [childId, categoryId]);

    useEffect(() => {
        startSession(childId, categoryId).then((session) => {
            setSessionId(session.sessionId);
            loadRound(session.sessionId);
        }).catch((err) => setError(err.message));
    }, [childId, categoryId, loadRound]);

    async function handleAnswer(option) {
        setStatus('checking');
        try {
            const result = await submitAnswer(childId, categoryId, sessionId, round.targetId, option.id);
            setStatus(result.correct ? 'correct' : 'incorrect');
            setFeedback({ message: result.message, currentStreak: result.currentStreak });
            if (result.correct) speak(result.message);

            if (result.sessionComplete) {
                setTimeout(() => setSessionSummary(result), 1600);
            } else {
                setTimeout(() => loadRound(sessionId), 1600);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    function playAgain() {
        setSessionSummary(null);
        setRound(null);
        startSession(childId, categoryId).then((session) => {
            setSessionId(session.sessionId);
            loadRound(session.sessionId);
        });
    }

    if (error) return <div className="p-8 text-center font-body text-ink">{error}</div>;

    if (sessionSummary) {
        return (
            <div className="min-h-screen bg-sunshine flex flex-col items-center justify-center px-6 py-8">
                <Mascot mood="happy" size={140} />
                <h2 className="font-display text-4xl text-ink mt-6">Great work!</h2>
                <p className="font-body text-xl text-ink/70 mt-2">
                    You finished {sessionSummary.roundsCompleted} rounds!
                </p>
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={playAgain}
                        className="font-body font-bold text-white bg-coral rounded-full px-8 py-4
                       shadow-[0_6px_0_0_rgba(61,52,85,0.2)] hover:-translate-y-1 transition-all"
                    >
                        🔁 Play Again
                    </button>
                    <Link
                        to="/dashboard"
                        className="font-body font-bold text-ink bg-white rounded-full px-8 py-4
                       shadow-[0_6px_0_0_rgba(61,52,85,0.1)] hover:-translate-y-1 transition-all flex items-center"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    if (!round) {
        return (
            <div className="min-h-screen bg-sunshine flex items-center justify-center">
                <Mascot mood="idle" size={100} />
            </div>
        );
    }

    const mood = status === 'correct' ? 'happy' : status === 'incorrect' ? 'sad' : 'idle';

    return (
        <div className="min-h-screen bg-sunshine flex flex-col items-center px-6 py-8">
            <div className="w-full max-w-2xl flex items-center justify-between mb-6">
                <Link to="/dashboard" className="font-body font-semibold text-ink/60 hover:text-ink">
                    ← Back
                </Link>
                <span className="font-body font-semibold text-ink/60">
          Round {round.roundNumber} of {round.totalRounds}
        </span>
                {feedback?.currentStreak > 1 && (
                    <span className="font-body font-bold text-coral">🔥 {feedback.currentStreak} streak!</span>
                )}
            </div>

            <div className="flex items-center gap-4 bg-white rounded-3xl px-8 py-5 shadow-lg mb-10">
                <Mascot mood={mood} size={80} />
                <div>
                    <p className="font-display text-3xl text-ink">Which one is {round.targetId}?</p>
                    <button
                        onClick={() => speak(`Which one is ${round.targetId}?`)}
                        className="font-body text-sky font-semibold mt-1 hover:underline"
                    >
                        🔊 Hear it again
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {round.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleAnswer(option)}
                        disabled={status !== 'waiting'}
                        className="bg-white rounded-3xl p-4 shadow-[0_8px_0_0_rgba(61,52,85,0.15)]
                       hover:-translate-y-1 active:translate-y-0 active:shadow-[0_2px_0_0_rgba(61,52,85,0.15)]
                       transition-all disabled:opacity-60"
                    >
                        <img
                            src={`${API_BASE_URL}${option.imageUrl}`}
                            alt={option.displayText}
                            width={160}
                            height={160}
                            className="rounded-2xl animate-pop"
                        />
                    </button>
                ))}
            </div>

            {status === 'correct' && (
                <p className="font-display text-4xl text-leaf mt-10 animate-pop">🎉 {feedback.message} 🎉</p>
            )}
            {status === 'incorrect' && (
                <p className="font-display text-2xl text-coral mt-10 animate-pop">{feedback.message}</p>
            )}
        </div>
    );
}