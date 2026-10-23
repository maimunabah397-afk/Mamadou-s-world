// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileSelect from './pages/ProfileSelect';
import QuizMode from './pages/QuizMode';
import ProgressView from './pages/ProgressView';
import LearnMode from './pages/LearnMode';

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/children/:childId/categories/:categoryId/play" element={<QuizMode />} />
                        <Route path="/children/:childId/categories/:categoryId/progress" element={<ProgressView />} />
                        <Route path="/select-profile" element={<ProfileSelect />} />
                        <Route path="/children/:childId/categories/:categoryId/learn" element={<LearnMode />} />

                    </Route>

                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}