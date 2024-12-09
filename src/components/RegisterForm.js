import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import ErrorDialog from './ErrorDialog';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({ show: false, message: "" });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if passwords match
        if (password !== confirmPassword) {
            setError({ show: true, message: "Passwords do not match!" });
            return;
        }

        try {
            // Send request to backend API
            const response = await api.post(`/auth/register`, {
                username,
                email,
                password,
            });
            const responseData = response?.data;
            if (responseData?.status) {
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('userId', responseData.userId);
                navigate('/');
            } else {
                setError({ show: true, message: responseData?.message })
            }
        } catch (err) {
            console.log(err);
            setError({ show: true, message: err.response?.data?.message || 'An error occurred during registration.' });
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Register</button>
            </form>

            <ErrorDialog show={error?.show} onClose={() => {
                setError({ show: false, message: '' })
            }} message={error?.message} />

        </div>
    );
};

export default RegisterForm;
