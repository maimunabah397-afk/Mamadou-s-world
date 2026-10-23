// src/pages/SignUp.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { signup } from '../api/auth';
import Mascot from '../components/Mascot';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);
        try {
            const { token } = await signup(email, password);
            login(token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-sunshine flex flex-col items-center justify-center px-6 py-8">
            <Mascot mood="happy" size={100} />
            <h1 className="font-display text-4xl text-ink mt-4 mb-8">Join the fun!</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 shadow-[0_10px_0_0_rgba(61,52,85,0.1)] w-full max-w-sm flex flex-col gap-5"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-body font-semibold text-ink/70">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="font-body rounded-full px-5 py-3 border-2 border-sunshine focus:border-sky outline-none text-ink transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-body font-semibold text-ink/70">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className="font-body rounded-full px-5 py-3 border-2 border-sunshine focus:border-sky outline-none text-ink transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword" className="font-body font-semibold text-ink/70">
                        Confirm password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        className="font-body rounded-full px-5 py-3 border-2 border-sunshine focus:border-sky outline-none text-ink transition-colors"
                    />
                </div>

                {error && (
                    <p role="alert" className="font-body font-semibold text-coral text-center">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="font-body font-bold text-white bg-leaf rounded-full px-6 py-4 mt-2
                     shadow-[0_6px_0_0_rgba(61,52,85,0.2)] hover:-translate-y-1
                     active:translate-y-0 active:shadow-[0_2px_0_0_rgba(61,52,85,0.2)]
                     transition-all disabled:opacity-60"
                >
                    {loading ? 'Creating account...' : 'Sign up'}
                </button>
            </form>

            <p className="font-body text-ink/60 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-sky hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    );
}