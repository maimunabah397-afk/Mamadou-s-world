// src/components/Mascot.jsx
export default function Mascot({ mood = 'idle', size = 100 }) {
    const bodyColor = mood === 'happy' ? '#4ECB71' : mood === 'sad' ? '#FF6B9D' : '#4DB8FF';

    return (
        <svg
            viewBox="0 0 120 120"
            width={size}
            height={size}
            className={mood === 'happy' ? 'animate-celebrate' : 'animate-mascot'}
        >
            <ellipse cx="60" cy="65" rx="45" ry="42" fill={bodyColor} />
            <circle cx="42" cy="58" r="8" fill="#3D3455" />
            <circle cx="78" cy="58" r="8" fill="#3D3455" />
            <circle cx="44" cy="55" r="2.5" fill="white" />
            <circle cx="80" cy="55" r="2.5" fill="white" />
            {mood === 'happy' ? (
                <path d="M40 78 Q60 98 80 78" stroke="#3D3455" strokeWidth="5" fill="none" strokeLinecap="round" />
            ) : mood === 'sad' ? (
                <path d="M40 82 Q60 72 80 82" stroke="#3D3455" strokeWidth="5" fill="none" strokeLinecap="round" />
            ) : (
                <ellipse cx="60" cy="78" rx="10" ry="7" fill="#3D3455" />
            )}
            <circle cx="30" cy="70" r="6" fill="#FFB6C9" opacity="0.7" />
            <circle cx="90" cy="70" r="6" fill="#FFB6C9" opacity="0.7" />
        </svg>
    );
}