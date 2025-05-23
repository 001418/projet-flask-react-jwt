// src/components/BookDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetail.css';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Connexion requise.');
      return;
    }

    fetch(`http://127.0.0.1:5000/api/books/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          setBook(data);
        } else {
          setMessage(data.error || 'Livre introuvable.');
        }
      })
      .catch(() => setMessage('Erreur réseau.'));
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm('Confirmer la suppression de ce livre ?');
    if (!confirm) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert('Livre supprimé.');
        navigate('/books');
      } else {
        setMessage(data.error || 'Erreur lors de la suppression.');
      }
    } catch {
      setMessage('Erreur réseau.');
    }
  };

  return (
    <div className="book-detail-container">
      <h2 className="titrePage">📖 Détail du Livre</h2>

      {message && <p className="message">{message}</p>}

      {book && (
        <div className="book-detail-card">
          <p><strong>Titre :</strong> {book.title}</p>
          <p><strong>Auteur :</strong> {book.author}</p>
          <p><strong>Genre :</strong> {book.genre || 'Non spécifié'}</p>
          <p><strong>Année :</strong> {book.year || '—'}</p>
          <p><strong>Quantité :</strong> {book.quantity || '—'}</p>
          <p><strong>ISBN :</strong> {book.isbn || '—'}</p>

          <div className="button-group">
            <button onClick={() => navigate('/books')} className="btn-return">⬅ Retour</button>
            <button onClick={handleDelete} className="btn-delete"> Supprimer</button>
            <button onClick={() => navigate(`/edit-book/${id}`)} className="btn-edit">✏️ Modifier</button>
            <button onClick={() => navigate('/books')} className="btn-return">⬅️ Retour</button>
            <button onClick={() => navigate(`/edit-book/${id}`)} className="btn-edit">✏️ Modifier</button>
            <button onClick={handleDelete} className="btn-delete">🗑️ Supprimer</button>
            <div className="button-group">
        </div>

      </div>
        </div>
      )}
    </div>
  );
}

export default BookDetail;
