import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import NotFound from './pages/NotFound';
import './index.css';
import BookForm from './components/BookForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import api from './api/api';
import { login, logout } from './app/authSlice';

function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const isUserLogin = useSelector((state) => state.auth.userLogin);

  useEffect(() => {
    try {
      api.get('/auth/check')
        .then((res) => {
          const response = res?.data;
          if (response && response.status) {
            dispatch(login({ userId: response.data._id, token: token }));
          } else {
            dispatch(logout());
          }
        })
        .catch((error) => {
          dispatch(logout());
        });
    } catch (e) {

    }
  }, [])

  return (
    <Router>
      <Navbar />
      <div className="container">
        {
          isUserLogin ?
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books/:id" element={<BookPage />} />
              <Route path="/create-book" element={<BookForm />} />
              <Route path="/edit-book/:id" element={<BookForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            :
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
