import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBooks.css';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    quantity: '',
    isbn: ''
  });

  const [errors, setErrors] = useState({});
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
          setFormData({
            title: data.title || '',
            author: data.author || '',
            genre: data.genre || '',
            year: data.year || '',
            quantity: data.quantity || '',
            isbn: data.isbn || ''
          });
        } else {
          setMessage(data.error || 'Livre introuvable.');
        }
      })
      .catch(() => setMessage('Erreur lors du chargement.'));
  }, [id]);

  const validate = (name, value) => {
    let error = '';
    if (name === 'year') {
      const y = parseInt(value);
      if (isNaN(y) || y < 1800 || y > currentYear) {
        error = `Année invalide (entre 1800 et ${currentYear})`;
      }
    } else if (name === 'quantity') {
      if (parseInt(value) < 0) {
        error = 'Quantité négative non autorisée';
      }
    } else if (!value.trim()) {
      error = 'Ce champ est requis';
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const hasErrors = () => Object.values(errors).some(err => err);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (hasErrors()) {
      setMessage('Corrigez les erreurs du formulaire.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/books');
      } else {
        setMessage(data.error || 'Erreur lors de la mise à jour.');
      }
    } catch {
      setMessage('Erreur réseau.');
    }
  };

  return (
    <div className="edit-container">
      <h2 className="titrePage">✏️ Modifier le Livre</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleUpdate} className="edit-form">
        {[
          { label: 'Titre', name: 'title' },
          { label: 'Auteur', name: 'author' },
          { label: 'Année', name: 'year', type: 'number' },
          { label: 'Quantité', name: 'quantity', type: 'number' },
          { label: 'ISBN', name: 'isbn' }
        ].map(({ label, name, type = 'text' }) => (
          <div key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
            {errors[name] && <small className="field-error">{errors[name]}</small>}
          </div>
        ))}

        <label>Genre</label>
        <select name="genre" value={formData.genre} onChange={handleChange}>
          <option value="">-- Choisir un genre --</option>
          <option value="roman">Roman</option>
          <option value="science-fiction">Science-fiction</option>
          <option value="philosophie">Philosophie</option>
          <option value="policier">Policier</option>
          <option value="fantastique">Fantastique</option>
        </select>

        <button type="submit" disabled={hasErrors()}>💾 Enregistrer</button>
      </form>
    </div>
  );
}

export default EditBook;
