import React, { useEffect, useState } from 'react';
import './BooksList.css';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Veuillez vous connecter pour voir vos livres.');
      return;
    }

    fetch('http://127.0.0.1:5000/api/books', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          setMessage(data.message || 'Erreur inconnue');
        }
      })
      .catch(() => {
        setMessage('Erreur lors du chargement des livres.');
      });
  }, []);

  return (
    <div className="books-container">
      <h2 className="titrePage">📚 Liste de vos livres</h2>
      {message && <p className="message">{message}</p>}

      {books.length > 0 ? (
        <ul className="book-list">
          {books.map(book => (
            <li key={book.id} className="book-item">
              <strong>{book.title}</strong> <em>par</em> {book.author}
              {book.genre && (
                <>
                  — <span className="badge">{book.genre}</span>
                </>
              )}
              {book.user_id && (
                <>
                  — <em>ID utilisateur :</em> {book.user_id}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        !message && <p>Aucun livre trouvé.</p>
      )}
    </div>
  );
}

export default BooksList;

