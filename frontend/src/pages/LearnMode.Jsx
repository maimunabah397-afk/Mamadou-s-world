import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryItems } from '../api/categories';
import { speakRepeated } from '../audio/speech';
import { API_BASE_URL } from '../api/client';
import Mascot from '../components/Mascot';

export default function LearnMode() {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [index, setIndex] = useState(0);
    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
        getCategoryItems(categoryId).then(setItems);
    }, [categoryId]);

    const playCurrent = useCallback(async () => {
        if (!items[index]) return;
        setSpeaking(true);
        await speakRepeated(items[index].speakText, 3);
        setSpeaking(false);
    }, [items, index]);

    useEffect(() => { playCurrent(); }, [playCurrent]);

    function next() {
        setIndex((i) => (i + 1) % items.length);
    }

    function prev() {
        setIndex((i) => (i - 1 + items.length) % items.length);
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-sunshine flex items-center justify-center">
                <Mascot mood="idle" size={100} />
            </div>
        );
    }

    const item = items[index];

    return (
        <div className="min-h-screen bg-sunshine flex flex-col items-center px-6 py-8">
            <Link
                to="/dashboard"
                className="self-start font-body font-semibold text-ink/60 hover:text-ink mb-6"
            >
                ← Back
            </Link>

            <div className="flex items-center gap-4 bg-white rounded-3xl px-8 py-5 shadow-lg mb-10">
                <Mascot mood={speaking ? 'happy' : 'idle'} size={72} />
                <p className="font-display text-4xl text-ink">{item.displayText}</p>
            </div>

            <div className="relative inline-block">
                <img
                    src={`${API_BASE_URL}${item.imageUrl}`}
                    alt={item.displayText}
                    width={240}
                    height={240}
                    className="rounded-3xl bg-white p-3 shadow-[0_10px_0_0_rgba(61,52,85,0.15)] transition-shadow duration-300"
                    style={{
                        boxShadow: speaking
                            ? '0 10px 0 0 rgba(61,52,85,0.15), 0 0 0 8px #FFD166'
                            : '0 10px 0 0 rgba(61,52,85,0.15)',
                    }}
                />
                {speaking && (
                    <div
                        className="absolute left-1/2 -translate-x-1/2 text-4xl"
                        style={{ bottom: -48, animation: 'point-bounce 0.6s infinite alternate' }}
                    >
                        👆
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 mt-16">
                <button
                    onClick={prev}
                    className="font-body font-bold text-ink bg-white rounded-full px-6 py-4 shadow-[0_6px_0_0_rgba(61,52,85,0.15)]
                     hover:-translate-y-1 active:translate-y-0 active:shadow-[0_2px_0_0_rgba(61,52,85,0.15)] transition-all"
                >
                    ◀ Previous
                </button>
                <button
                    onClick={playCurrent}
                    disabled={speaking}
                    className="font-body font-bold text-white bg-sky rounded-full px-8 py-4 shadow-[0_6px_0_0_rgba(61,52,85,0.2)]
                     hover:-translate-y-1 active:translate-y-0 active:shadow-[0_2px_0_0_rgba(61,52,85,0.2)]
                     transition-all disabled:opacity-60"
                >
                    🔊 Say it again
                </button>
                <button
                    onClick={next}
                    className="font-body font-bold text-ink bg-white rounded-full px-6 py-4 shadow-[0_6px_0_0_rgba(61,52,85,0.15)]
                     hover:-translate-y-1 active:translate-y-0 active:shadow-[0_2px_0_0_rgba(61,52,85,0.15)] transition-all"
                >
                    Next ▶
                </button>
            </div>

            <style>{`
        @keyframes point-bounce {
          from { transform: translate(-50%, 0); }
          to { transform: translate(-50%, -12px); }
        }
      `}</style>
        </div>
    );
}