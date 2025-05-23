
==============================
PROJET "Bibliothèque Personnelle"
==============================

Auteur : Benoît  
Date : Mai 2025  
Lieu : Caplogy / Projet CMS B3  

Objectif :
----------
Développer une application web moderne permettant aux utilisateurs de gérer leur propre bibliothèque de livres.

Les fonctionnalités incluent :
- Inscription et authentification sécurisée par token JWT
- Consultation, ajout, modification et suppression de livres
- Affichage détaillé de chaque livre (titre, auteur, résumé, ISBN)
- Recherche dynamique dans la collection
- Interface responsive, utilisable sur smartphone, tablette et PC

Structure du projet :
---------------------
- /backend : API Flask (REST), base de données, logique métier
  - app.py : point d'entrée principal du serveur Flask
  - models.py : structure ORM des données (utilisateurs, livres)
  - api/
    - auth.py : routes d’authentification JWT
    - books.py : routes liées aux livres (CRUD, recherche)
  - config.py : variables d’environnement et configuration de l’API
  - requirements.txt : dépendances Python

- /frontend : Interface React (SPA)
  - public/ : ressources statiques
  - src/
    - App.js : structure générale et routage
    - components/ : composants pour les livres, formulaires, etc.
    - pages/ : login, register, booklist, bookdetail, etc.
  - package.json : configuration du projet React

- docker-compose.yml : configuration du projet pour usage conteneurisé
- README.md : ce fichier

Installation locale (sans Docker) :
-----------------------------------
1. Cloner le dépôt Git :
   git clone https://github.com/<utilisateur>/bibliotheque-app.git

2. Backend Flask :
   cd backend  
   python -m venv venv  
   source venv/bin/activate  (ou .\venv\Scripts\activate sous Windows)  
   pip install -r requirements.txt

3. Frontend React :
   cd ../frontend  
   npm install  
   npm start

4. Vérifier les accès :
   - Frontend : http://localhost:3000  
   - Backend API : http://localhost:5000/api

Mise en production (version build) :
-------------------------------------
1. Frontend :
   cd frontend  
   npm run build

2. Un dossier `/build` est généré : il peut être servi par un serveur statique ou copié dans un serveur nginx.

Dockerisation :
---------------
1. Le projet est entièrement dockerisé.

2. Lancer via Docker Compose (à la racine) :
   docker-compose up --build

Cela crée deux services :
- un backend Flask sur le port 5000
- un frontend React sur le port 3000

3. Arrêt :
   docker-compose down

Authentification :
------------------
- JWT stocké côté client (localStorage)
- Requêtes protégées par header :
    Authorization: Bearer <token>

Base de données :
-----------------
- SQLite utilisée en local, extensible à PostgreSQL ou MySQL
- Deux tables principales : `users`, `books`

Test de l'application :
-----------------------
- Inscription d’un utilisateur via `/register`
- Connexion via `/login` → renvoi d’un token JWT
- Accès aux routes CRUD :
    - /api/books (GET, POST)
    - /api/books/:id (GET, PUT, DELETE)
    - /api/books/search?q=motcle

Fonctionnalités :
-----------------
- Interface dynamique React (SPA, sans rechargement)
- Authentification sécurisée (hash, JWT)
- Recherche et filtrage instantanés
- Design mobile-first
- Séparation claire du front et du back

Remerciements :
---------------
Projet réalisé dans le cadre du module CMS B3 Développement Web Avancé, avec une attention portée à la clarté, à la modularité et à la facilité d’extension.

Notes :
-------
- Le dépôt GitHub n’inclut pas les fichiers volumineux (`node_modules`, `__pycache__`, `.db`, etc.)
- L'application est conçue pour être relancée facilement dans tout environnement standardisé (Docker ou local)
- Licence MIT

==============================   # Projet Full-Stack – CMS B3 Caplogy
