
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listChildren, createChild } from '../api/children';
import { useAuth } from '../auth/AuthContext';
import Mascot from '../components/Mascot';

const AVATAR_COLORS = [
    '#FF6B9D',
    '#4DB8FF',
    '#4ECB71',
    '#FFB84D',
    '#B388FF',
];

const PHASE_ONE_CATEGORIES = [
    {
        id: 'alphabet',
        title: 'Alphabet',
        description: 'Letters A to Z',
        icon: 'Aa',
        color: 'bg-sky',
        available: true,
    },
    {
        id: 'numbers',
        title: 'Numbers',
        description: 'Counting 1 to 10',
        icon: '123',
        color: 'bg-coral',
        available: true,
    },
    {
        id: 'colors',
        title: 'Colors',
        description: 'Discover colorful things',
        icon: '🎨',
        color: 'bg-leaf',
        available: true,
    },
    {
        id: 'shapes',
        title: 'Shapes',
        description: 'Circle, square, triangle',
        icon: '🔺',
        color: 'bg-sky',
        available: false,
    },
    {
        id: 'body_parts',
        title: 'Body Parts',
        description: 'Head, eyes, nose, hands',
        icon: '👀',
        color: 'bg-coral',
        available: false,
    },
    {
        id: 'fruits',
        title: 'Fruits',
        description: 'Apple, banana, orange',
        icon: '🍎',
        color: 'bg-leaf',
        available: false,
    },
    {
        id: 'vegetables_legumes',
        title: 'Vegetables & Legumes',
        description: 'Carrots, peas, beans',
        icon: '🥕',
        color: 'bg-coral',
        available: false,
    },
    {
        id: 'animals',
        title: 'Animals',
        description: 'Meet our animal friends',
        icon: '🐻',
        color: 'bg-sky',
        available: false,
    },
    {
        id: 'everyday_objects',
        title: 'Everyday Objects',
        description: 'Things around us',
        icon: '🧸',
        color: 'bg-leaf',
        available: false,
    },
    {
        id: 'family',
        title: 'Family',
        description: 'People we love',
        icon: '🏡',
        color: 'bg-coral',
        available: false,
    },
];

function avatarColor(name = '') {
    const sum = [...name].reduce(
        (acc, ch) => acc + ch.charCodeAt(0),
        0
    );

    return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function CategoryCard({ childId, category }) {
    const { id, title, description, icon, color, available } = category;

    return (
        <div
            className={`rounded-2xl p-4 sm:p-5 ${
                available ? 'bg-sunshine' : 'bg-sunshine/40'
            }`}
        >
            <div className="flex items-start gap-3">
                <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl
            ${color} flex items-center justify-center
            font-display text-3xl sm:text-4xl text-white shadow-md`}
                >
                    {icon}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl sm:text-2xl text-ink">
                        {title}
                    </h3>

                    <p className="font-body text-sm text-ink/60 font-medium mt-1">
                        {description}
                    </p>

                    {available ? (
                        <div className="flex flex-wrap gap-2 mt-4">
                            <Link
                                to={`/children/${childId}/categories/${id}/learn`}
                                className="font-body font-bold text-white bg-leaf
                  rounded-full px-4 py-2
                  shadow-[0_4px_0_0_rgba(61,52,85,0.2)]
                  hover:-translate-y-0.5 transition-all"
                            >
                                📖 Learn
                            </Link>

                            <Link
                                to={`/children/${childId}/categories/${id}/play`}
                                className="font-body font-bold text-white bg-coral
                  rounded-full px-4 py-2
                  shadow-[0_4px_0_0_rgba(61,52,85,0.2)]
                  hover:-translate-y-0.5 transition-all"
                            >
                                🎯 Play
                            </Link>
                        </div>
                    ) : (
                        <span className="inline-block mt-4 font-body font-bold
              text-ink/50 bg-white/70 rounded-full px-4 py-2 text-sm">
              Coming soon ✨
            </span>
                    )}
                </div>
            </div>
        </div>
    );
}

function PhaseSection({ childId }) {
    const availableCount = PHASE_ONE_CATEGORIES.filter(
        (category) => category.available
    ).length;

    return (
        <section className="mt-6">
            <div className="bg-sky rounded-3xl p-6 sm:p-8 text-white
        shadow-[0_8px_0_0_rgba(61,52,85,0.12)]">

                <div className="flex items-center gap-4">
                    <div className="text-4xl sm:text-5xl">🌈</div>

                    <div>
                        <p className="font-body font-bold text-white/80 text-sm">
                            PHASE 1 · AGES 3–4
                        </p>

                        <h3 className="font-display text-2xl sm:text-3xl">
                            Explore & Discover
                        </h3>
                    </div>
                </div>

                <p className="font-body mt-4 max-w-2xl text-white/90">
                    Let's discover letters, numbers, colors, animals,
                    and the wonderful world around us!
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
          <span className="bg-white/20 rounded-full px-4 py-2
            font-body font-semibold text-sm">
            {availableCount} categories available
          </span>

                    <span className="bg-white/20 rounded-full px-4 py-2
            font-body font-semibold text-sm">
            {PHASE_ONE_CATEGORIES.length - availableCount} coming soon
          </span>
                </div>
            </div>

            <div className="mt-6 mb-4">
                <h3 className="font-display text-2xl text-ink">
                    Let's learn something new!
                </h3>

                <p className="font-body text-ink/60 mt-1">
                    Choose a category to start learning and playing.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PHASE_ONE_CATEGORIES.map((category) => (
                    <CategoryCard
                        key={category.id}
                        childId={childId}
                        category={category}
                    />
                ))}
            </div>
        </section>
    );
}

export default function Dashboard() {
    const [children, setChildren] = useState([]);
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adding, setAdding] = useState(false);

    const { logout } = useAuth();

    useEffect(() => {
        listChildren()
            .then(setChildren)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    async function handleAddChild(e) {
        e.preventDefault();

        if (!nickname.trim()) return;

        try {
            const child = await createChild(nickname.trim(), null);

            setChildren((prev) => [...prev, child]);
            setNickname('');
            setAdding(false);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-sunshine flex items-center justify-center">
                <Mascot mood="idle" size={100} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sunshine px-4 sm:px-6 py-8">
            <header className="flex items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-3 sm:gap-4">
                    <Mascot mood="happy" size={64} />

                    <h1 className="font-display text-2xl sm:text-4xl text-ink">
                        Mamadou's World
                    </h1>
                </div>

                <button
                    onClick={logout}
                    className="font-body font-semibold text-ink/50
            hover:text-ink transition-colors"
                >
                    Log out
                </button>
            </header>

            {error && (
                <p role="alert" className="font-body text-coral font-semibold mb-6 text-center">
                    {error}
                </p>
            )}

            {children.length === 0 && !adding && (
                <div className="flex flex-col items-center gap-6 mt-16">
                    <Mascot mood="idle" size={120} />

                    <p className="font-display text-2xl text-ink text-center">
                        Let's add your first learner!
                    </p>

                    <button
                        onClick={() => setAdding(true)}
                        className="font-body font-bold text-lg bg-coral text-white
              rounded-full px-8 py-4
              shadow-[0_6px_0_0_rgba(61,52,85,0.2)]
              hover:-translate-y-1 transition-all"
                    >
                        + Add a child
                    </button>
                </div>
            )}

            <main className="max-w-6xl mx-auto space-y-8">
                {children.map((child) => (
                    <section
                        key={child.id}
                        className="bg-white rounded-3xl p-4 sm:p-7
              shadow-[0_10px_0_0_rgba(61,52,85,0.1)]"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="w-16 h-16 shrink-0 rounded-full
                  flex items-center justify-center font-display
                  text-2xl text-white shadow-md"
                                style={{
                                    backgroundColor: avatarColor(child.nickname),
                                }}
                            >
                                {child.nickname.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <h2 className="font-display text-2xl sm:text-3xl text-ink">
                                    {child.nickname}'s Corner
                                </h2>

                                <p className="font-body text-ink/60">
                                    Ready for a little adventure?
                                </p>
                            </div>
                        </div>

                        <PhaseSection childId={child.id} />

                        <Link
                            to={`/children/${child.id}/categories/alphabet/progress`}
                            className="inline-block mt-6 font-body font-semibold
                text-ink/50 hover:text-ink text-sm"
                        >
                            View progress →
                        </Link>
                    </section>
                ))}
            </main>

            <div className="max-w-6xl mx-auto mt-8">
                {adding ? (
                    <form
                        onSubmit={handleAddChild}
                        className="bg-white rounded-3xl p-6
              shadow-[0_10px_0_0_rgba(61,52,85,0.1)]
              flex gap-3 flex-wrap"
                    >
                        <input
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="Child's nickname"
                            autoFocus
                            required
                            className="font-body flex-1 min-w-[200px]
                rounded-full px-5 py-3 border-2 border-sunshine
                focus:border-sky outline-none text-ink"
                        />

                        <button
                            type="submit"
                            className="font-body font-bold text-white bg-sky
                rounded-full px-6 py-3"
                        >
                            Add
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setAdding(false);
                                setNickname('');
                            }}
                            className="font-body font-semibold text-ink/50
                hover:text-ink px-4"
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    children.length > 0 && (
                        <button
                            onClick={() => setAdding(true)}
                            className="font-body font-bold text-ink bg-white
                rounded-full px-6 py-3 w-full
                shadow-[0_6px_0_0_rgba(61,52,85,0.1)]
                hover:-translate-y-1 transition-all"
                        >
                            + Add another child
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
