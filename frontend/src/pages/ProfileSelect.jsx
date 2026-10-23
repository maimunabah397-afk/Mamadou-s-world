// src/pages/ProfileSelect.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listChildren } from '../api/children';

export default function ProfileSelect() {
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        listChildren()
            .then(setChildren)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Who's playing?</h1>
            <div style={{ display: 'flex', gap: '1rem' }}>
                {children.map((child) => (
                    <button
                        key={child.id}
                        onClick={() => navigate(`/children/${child.id}/play`)}
                    >
                        {child.nickname}
                    </button>
                ))}
            </div>
        </div>
    );
}