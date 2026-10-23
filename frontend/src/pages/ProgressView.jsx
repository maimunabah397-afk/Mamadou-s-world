import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProgress } from '../api/progress';
import Mascot from '../components/Mascot';

const LEVEL_ICON = {
    not_started: '🌱',
    learning: '📈',
    mastered: '⭐',
};

const LEVEL_LABEL = {
    not_started: 'Not started',
    learning: 'Learning',
    mastered: 'Mastered',
};

const LEVEL_BG = {
    not_started: 'bg-white',
    learning: 'bg-sky/20',
    mastered: 'bg-leaf/25',
};

function timeAgo(isoString) {
    if (!isoString) return 'Not yet practiced';
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
}

export default function ProgressView() {
    const { childId, categoryId } = useParams();
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProgress(childId, categoryId)
            .then(setProgress)
            .catch((err) => setError(err.message));
    }, [childId, categoryId]);

    if (error) {
        return <div className="min-h-screen bg-sunshine flex items-center justify-center font-body text-coral">{error}</div>;
    }

    if (!progress) {
        return (
            <div className="min-h-screen bg-sunshine flex items-center justify-center">
                <Mascot mood="idle" size={100} />
            </div>
        );
    }

    const percent = Math.round((progress.masteredCount / progress.totalItems) * 100);

    return (
        <div className="min-h-screen bg-sunshine px-6 py-8">
            <Link to="/dashboard" className="font-body font-semibold text-ink/60 hover:text-ink">
                ← Back to Dashboard
            </Link>

            <div className="max-w-2xl mx-auto mt-6">
                {/* Header */}
                <div className="flex items-center gap-4 bg-white rounded-3xl px-8 py-6 shadow-lg mb-6">
                    <Mascot mood={percent > 50 ? 'happy' : 'idle'} size={80} />
                    <div>
                        <h1 className="font-display text-3xl text-ink capitalize">{categoryId} Progress</h1>
                        <p className="font-body text-ink/60">{timeAgo(progress.lastPracticed)}</p>
                    </div>
                </div>

                {/* Summary stat */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_0_rgba(61,52,85,0.1)] mb-6">
                    <p className="font-display text-2xl text-ink mb-3">
                        ⭐ {progress.masteredCount} / {progress.totalItems} mastered
                    </p>
                    <div className="w-full h-5 bg-sunshine rounded-full overflow-hidden">
                        <div
                            className="h-full bg-leaf rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                </div>

                {/* Still practicing */}
                {progress.stillPracticing.length > 0 && (
                    <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_0_rgba(61,52,85,0.1)] mb-6">
                        <p className="font-display text-xl text-ink mb-3">Still practicing</p>
                        <div className="flex gap-3 flex-wrap">
                            {progress.stillPracticing.map((id) => (
                                <span
                                    key={id}
                                    className="font-body font-bold text-white bg-sky rounded-full w-10 h-10 flex items-center justify-center"
                                >
                  {id}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Full grid */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_10px_0_0_rgba(61,52,85,0.1)]">
                    <p className="font-display text-xl text-ink mb-4">All letters</p>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                        {progress.items.map((item) => (
                            <div
                                key={item.itemId}
                                className={`${LEVEL_BG[item.masteryLevel]} rounded-2xl p-3 flex flex-col items-center gap-1`}
                                title={LEVEL_LABEL[item.masteryLevel]}
                            >
                                <span className="font-display text-xl text-ink">{item.itemId}</span>
                                <span className="text-lg">{LEVEL_ICON[item.masteryLevel]}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-6 mt-5 font-body text-sm text-ink/60 flex-wrap">
                        <span>🌱 Not started</span>
                        <span>📈 Learning</span>
                        <span>⭐ Mastered</span>
                    </div>
                </div>
            </div>
        </div>
    );
}