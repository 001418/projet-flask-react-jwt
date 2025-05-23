import React, { useState } from 'react';
import './SearchBooks.css';

function SearchBooks() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Connexion requise.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/books/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        const books = Array.isArray(data.books) ? data.books : [];
        setResults(books);
        setMessage(books.length === 0 ? 'Aucun résultat.' : '');
      } else {
        setMessage(data.error || 'Erreur lors de la recherche.');
      }
    } catch {
      setMessage('Erreur réseau.');
    }
  };

  return (
    <div className="search-container">
      <h2 className="titrePage">🔍 Rechercher un Livre</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Mot-clé..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Rechercher</button>
      </form>

      {message && <p className="message">{message}</p>}

      <ul className="search-results">
        {results.map(book => (
          <li key={book.id} className="search-item">
            <strong>{book.title}</strong> <em>par</em> {book.author}
            {book.genre && <> — <span className="badge">{book.genre}</span></>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBooks;

