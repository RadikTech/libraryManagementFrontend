import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

const BookForm = () => {
    const userId = useSelector((state) => state.auth.userId);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        createdAt: '',
        user: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setFormData({ ...formData, user: userId });
    }, [userId])

    useEffect(() => {
        if (id) {
            console.log(id);

            const fetchBook = async () => {
                const response = await api.get(`/books/${id}`);
                const responseData = response?.data;
                if (responseData?.status) {
                    setFormData(responseData.data);
                }
            };
            fetchBook();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (id) {
                response = await api.put(`/books/${id}`, formData);
            } else {
                response = await api.post('/books', formData);
            }

            console.log(response);

            const responseData = response?.data;
            if (responseData?.status) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {id ? 'Update Book' : 'Create New Book'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600 mb-1">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Genre:</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Publication Date:</label>
                    <input
                        type="date"
                        name="createdAt"
                        value={formData.createdAt}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mt-4"
                >
                    {id ? 'Update Book' : 'Create Book'}
                </Button>            </form>
        </div>
    );
};

export default BookForm;
