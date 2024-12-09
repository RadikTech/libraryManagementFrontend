import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Button } from '@mui/material';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            const response = await api.get(`/books/${id}`);
            const resposeData = response?.data;
            if (resposeData?.status) {
                setBook(resposeData.data);
            }
        };
        fetchBook();
    }, [id]);

    const handleBorrow = async () => {
        await api.post(`/books/borrow/${id}`);
        navigate('/');
    };

    const handleReturn = async () => {
        await api.post(`/books/return/${id}`);
        navigate('/');
    };

    if (!book) return <p>Loading...</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto my-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{book.title}</h2>
            <p className="text-gray-700 mb-2">
                <strong className="font-semibold">Author:</strong> {book.author}
            </p>
            <p className="text-gray-700 mb-2">
                <strong className="font-semibold">Genre:</strong> {book.genre}
            </p>
            <p className="text-gray-700 mb-2">
                <strong className="font-semibold">Publication Date:</strong> {book.publicationDate}
            </p>
            <p className="text-gray-700 mb-4">
                <strong className="font-semibold">Availability:</strong> {book.availability ? 'Available' : 'Not Available'}
            </p>

            {book.availability ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBorrow}
                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                >
                    Borrow
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleReturn}
                    className="w-full py-2 border-red-500 text-red-500 hover:border-red-600 hover:text-red-600 font-semibold rounded-md"
                >
                    Return
                </Button>
            )}
        </div>
    );
};

export default BookDetail;
