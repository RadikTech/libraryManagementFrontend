import { useId, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "./ErrorDialog";
import { useDispatch } from 'react-redux'
import { login } from "../app/authSlice";

const LoginForm = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState({ show: false, message: "" });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            const responseData = response?.data;
            console.log(responseData);
            if (responseData?.status) {
                dispatch(login({ token: responseData.token, userId: responseData.userId }))
                navigate('/');
            } else {
                setError({ show: true, message: responseData?.message });
            }
        } catch (err) {
            console.error('Error during login:', err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</button>
            </form>

            <ErrorDialog show={error?.show} onClose={() => {
                setError({ show: false, message: '' })
            }} message={error?.message} />

        </div>
    );
};

export default LoginForm;
