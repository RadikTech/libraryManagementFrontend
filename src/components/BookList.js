import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Button, MenuItem, Select, TextField } from '@mui/material';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState({ keyword: '', publicationDate: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await api.get('/books');
            const responseData = response?.data;
            if (responseData?.status) {
                setBooks(responseData.data);
            }
        };
        fetchBooks();
    }, []);

    const filteredBooks = books
        .filter(book =>
        (filter.keyword === '' ||
            book.genre.toLowerCase().includes(filter.keyword.toLowerCase()) ||
            book.author.toLowerCase().includes(filter.keyword.toLowerCase()))
        )
        .sort((a, b) => {
            if (filter.publicationDate === 'newest') {
                return new Date(b.publicationDate) - new Date(a.publicationDate);
            } else if (filter.publicationDate === 'oldest') {
                return new Date(a.publicationDate) - new Date(b.publicationDate);
            }
            return 0;
        });

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Book List</h2>

            <div className="flex items-center gap-4 mb-6">
                {/* Single Input for Genre/Author Filtering */}
                <div className="flex-grow">
                    <TextField
                        label="Filter by genre or author"
                        variant="outlined"
                        value={filter.keyword}
                        onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
                        fullWidth
                        className="w-full"
                    />
                </div>

                {/* Dropdown for Publication Date Sorting */}
                <div>
                    <Select
                        value={filter.publicationDate}
                        onChange={(e) => setFilter({ ...filter, publicationDate: e.target.value })}
                        variant="outlined"
                        className="w-48"
                    >
                        <MenuItem value="">
                            <em>Sort by Publication Date</em>
                        </MenuItem>
                        <MenuItem value="newest">Newest First</MenuItem>
                        <MenuItem value="oldest">Oldest First</MenuItem>
                    </Select>
                </div>

                {/* Create Book Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/create-book')}
                    className="ml-4"
                >
                    Create Book
                </Button>
            </div>

            {/* Book List */}
            <ul className="space-y-4">
                {filteredBooks.map(book => (
                    <li key={book._id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
                        <div>
                            <Link to={`/books/${book._id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                                {book.title}
                            </Link>
                            <p className="text-gray-600">{book.author} - {book.genre} ({new Date(book.publicationDate).getFullYear()})</p>
                        </div>

                        {/* Update Button */}
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate(`/edit-book/${book._id}`)}
                        >
                            Update
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
