import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


// Composant racine par défaut (temporaire)
/*
function App() {
  return <h1>Bienvenue dans l'application Bibliothèque</h1>;
}
*/

// Point de montage dans l'HTML (div#root)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
