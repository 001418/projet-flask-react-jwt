# 📚 Projet Bibliothèque — React + Flask

## 🎯 Objectif

Application web fullstack permettant à un utilisateur de :
- s’inscrire / se connecter via une API Flask sécurisée (JWT)
- gérer ses livres (ajout, suppression, édition)
- rechercher des livres personnels

---

## 📁 Structure du projet

```
bibliotheque-app/
├── backend/                # Serveur Flask (API REST sécurisée)
│   ├── app.py
│   ├── models.py
│   ├── config.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/               # Interface React (SPA)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml      # Orchestration des services
├── .env                    # Variables d'environnement Flask
└── README.md               # Ce fichier
```


Compléte arborescence: Car l'on oublie le dossier structurant .venv

projet-flask/
├── backend/
│   ├── .venv/
│   │   ├── Lib/
│   │   ├── Scripts/
│   │   └── ...
│   ├── api/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── books.py
│   ├── app.py
│   ├── config.py
│   ├── Dockerfile
│   ├── models.py
│   ├── requirements.txt
│   └── .dockerignore
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml
└── .gitignore


---

## ▶️ Installation en local (développement)

### 1. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
.venv\Scripts\activate   # Windows PowerShell

pip install -r requirements.txt
flask run
```

> Par défaut accessible via http://127.0.0.1:5000

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

> Par défaut accessible via http://localhost:3000

---

## 🐳 Lancer via Docker

### 1. Construire et démarrer tous les services

```bash
docker-compose up --build
```

- React → http://localhost:3000
- Flask → http://localhost:5000

---

## 🔐 Authentification

- JWT via `flask-jwt-extended`
- Token stocké en `localStorage`
- Ajouté dans les headers de chaque requête :

```js
Authorization: Bearer <token>
```

---

## ✅ Routes API

| Route                | Méthode | Authentification | Fonction                   |
|----------------------|---------|------------------|----------------------------|
| `/api/register`      | POST    | ❌               | Créer un compte            |
| `/api/login`         | POST    | ❌               | Obtenir un JWT             |
| `/api/books`         | GET     | ✅               | Lister les livres          |
| `/api/books`         | POST    | ✅               | Ajouter un livre           |
| `/api/books/:id`     | PUT     | ✅               | Modifier un livre          |
| `/api/books/:id`     | DELETE  | ✅               | Supprimer un livre         |
| `/api/books/search`  | GET     | ✅               | Rechercher par titre/auteur|

---

## ✍️ Auteur

Projet de fin de formation - Administrateur Systèmes & Réseaux  
Rendu final prévu : **août 2025**
