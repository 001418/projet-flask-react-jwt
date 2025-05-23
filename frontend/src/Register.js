import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage('Les mots de passe ne correspondent pas ❌');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Inscription réussie ✅');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage(data.error || 'Erreur lors de l’inscription ❌');
      }
    } catch {
      setMessage('Erreur réseau.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirmer le mot de passe" value={confirm}
               onChange={(e) => setConfirm(e.target.value)} required />
        <button type="submit">S’inscrire</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Register;
