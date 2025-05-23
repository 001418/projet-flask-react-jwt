// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import BooksList from './BooksList';
import AddBook from './AddBook';
import SearchBooks from './SearchBooks';
import BookDetail from './BookDetail';
import EditBook from './EditBooks'; // ✅ bien nommé et existant

function App() {
  return (
    <Router>
      <nav className="main-nav" 
           style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '30px',
                    padding: '20px',
                    backgroundColor: '#eaf4f4',
                    borderBottom: '2px solid #ccc',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}
      > 
        <Link to="/books">📚 Livres</Link> | 
        <Link to="/add-book">➕ Ajouter</Link> | 
        <Link to="/search">🔍 Recherche</Link> | 
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/search" element={<SearchBooks />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<p style={{ textAlign: 'center' }}>🚫 Page non trouvée</p>} />
      </Routes>
    </Router>
  );
}

export default App;
