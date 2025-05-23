import React, { useState } from 'react';
import './AddBook.css';

function AddBook() {
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
  const currentYear = new Date().getFullYear();

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

  const handleAddBook = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Veuillez vous connecter.');
      return;
    }

    if (hasErrors()) {
      setMessage('Corrigez les erreurs avant soumission.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/books', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Livre ajouté ✅');
        setFormData({
          title: '',
          author: '',
          genre: '',
          year: '',
          quantity: '',
          isbn: ''
        });
        setErrors({});
      } else {
        setMessage(data.error || 'Erreur lors de l’ajout ❌');
      }
    } catch {
      setMessage('Erreur réseau.');
    }
  };

  return (
    <form id="formulairelivre" onSubmit={handleAddBook}>
      <div className="form-grid">

        {[
          { label: 'Titre', name: 'title' },
          { label: 'Auteur', name: 'author' },
          { label: 'Année', name: 'year', type: 'number' },
          { label: 'Quantité', name: 'quantity', type: 'number' },
          { label: 'ISBN', name: 'isbn' }
        ].map(({ label, name, type = 'text' }) => (
          <div className="form-control" key={name}>
            <label htmlFor={name}>{label} :</label>
            <input
              type={type}
              id={name}
              name={name}
              placeholder={`Entrer ${label.toLowerCase()}`}
              value={formData[name]}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            {errors[name] && <small className="field-error">{errors[name]}</small>}
          </div>
        ))}

        <div className="form-control">
          <label htmlFor="genre">Genre :</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">-- Choisir un genre --</option>
            <option value="roman">Roman</option>
            <option value="science-fiction">Science-fiction</option>
            <option value="philosophie">Philosophie</option>
            <option value="policier">Policier</option>
            <option value="fantastique">Fantastique</option>
          </select>
        </div>
      </div>

      <div className="form-button">
        <button type="submit" disabled={hasErrors()}>Ajouter Livre</button>
      </div>

      {message && <p className="message">{message}</p>}
    </form>
  );
}

export default AddBook;
