# 📘 README\_BACKEND – API Flask JWT

---

## 🎯 Objectif

Ce backend Flask fournit une API REST sécurisée via JWT pour une application de gestion de livres. Chaque utilisateur peut s’inscrire, se connecter, et gérer ses propres livres (CRUD).

---

## 🧱 Structure des fichiers principaux

```
backend/
├── app.py                # Point d'entrée Flask avec create_app()
├── models.py             # Définition des modèles User et Book
├── config.py             # Paramètres d’application (clé secrète, URI BDD)
├── init_db.py            # Script unique d’initialisation de la base
├── reset_db.py           # 🔁 Réinitialise la base (drop + create)
├── test_register.py      # Test minimal de l’inscription JWT
├── api/
│   ├── auth.py           # Routes /api/register et /api/login
│   └── books.py          # Routes CRUD /api/books
├── requirements.txt      # Dépendances Python
```

---

## ⚙️ Installation et lancement (local)

```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1       # PowerShell (Windows)
pip install -r requirements.txt
python reset_db.py               # 🧨 Réinitialisation complète BDD
python app.py                    # 🚀 Lancement serveur Flask
```

---

## 🔐 Authentification JWT

* Le token est délivré à `/api/login` après succès
* Il doit être transmis dans le header :

  ```http
  Authorization: Bearer <token>
  ```
* Toutes les routes /books sont protégées via `@jwt_required()`

---

## 🔗 Endpoints disponibles

| Méthode | URL                    | Auth | Description                       |
| ------: | ---------------------- | ---- | --------------------------------- |
|    POST | `/api/register`        | ❌    | Crée un nouvel utilisateur        |
|    POST | `/api/login`           | ❌    | Retourne un token JWT             |
|     GET | `/api/books`           | ✅    | Liste les livres de l'utilisateur |
|    POST | `/api/books`           | ✅    | Ajoute un livre                   |
|     GET | `/api/books/<id>`      | ✅    | Récupère un livre précis          |
|     PUT | `/api/books/<id>`      | ✅    | Met à jour un livre               |
|  DELETE | `/api/books/<id>`      | ✅    | Supprime un livre                 |
|     GET | `/api/books/search?q=` | ✅    | Recherche par titre/auteur        |

---

## 🧪 Tests interactifs et inspection SQL

Pour inspecter la base de données (ex: vérifier les utilisateurs, les livres ou la session JWT) :

### ✅ Mode interactif Python :

```bash
python
```

```python
from app import create_app
from models import db, User, Book
app = create_app()
app.app_context().push()
Book.query.all()
```

### ✅ Via le shell Flask :

```bash
flask shell
```

---

## 🦞️ Exemple de test avec curl

```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com", "password":"123456"}'
```

```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com", "password":"123456"}'
```

---

## ✅ Curl – Test complet API (Register + Login + Authenticated Access)

```bash
# 1. Enregistrement d’un utilisateur
curl -X POST http://127.0.0.1:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com", "password":"123456"}'

# 2. Connexion de l'utilisateur
curl -X POST http://127.0.0.1:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com", "password":"123456"}'

# 3. Accès aux livres protégés
curl -X GET http://127.0.0.1:5000/api/books \
  -H "Authorization: Bearer <TON_TOKEN_ICI>"
```

---

## ✅ Tests automatisés

Un test minimal pour vérifier le bon fonctionnement de `/api/register` est fourni dans :

```
backend/test_register.py
```

Lancer avec :

```bash
pytest test_register.py
```

---

## 📄 Erreurs Fréquentes

### 🚩 Erreur 101 : commande shell dans Python

* **Message :** `SyntaxError: invalid syntax` après `python app.py`
* **Cause :** tu es dans `>>>` (Python interactif)
* **Solution :** tape `exit()` pour revenir à PowerShell, puis exécute `python app.py`

### ⚠️ Erreur 404 : route introuvable

* **Message :** `404 Not Found` pour `/api/register`
* **Causes possibles :**

  * Le blueprint n'est pas enregistré avec `url_prefix='/api'`
  * Tu testes `/api/...` alors que la route est juste `/...`
  * Tu n'as pas relancé `app.py` après modification
* **Diagnostic :**

  * Teste avec `curl` ou Postman `POST /api/register`
  * Vérifie que `auth_bp` est bien enregistré dans `app.py`

### 💥 Erreur 422 ou 500 après login .map is not a function dans React

* **Cause probable :** la base de données n’a pas été régénérée après une modification de modèle.
* **Solution :** lancer :

  ```bash
  python reset_db.py
  ```

---

## 💥 .map is not a function dans React


**Cause :** setResults(data) au lieu de setResults(data.books || [])


**Solution :** fichier SearchBooks.js, ligne ~32 :

setResults(Array.isArray(data.books) ? data.books : []);



## ⚖️ Validation quantité (négative interdite)

* ✅ Frontend : `AddBook.js` et `EditBook.js`

  * Bloc `validate(name, value)` :

    ```js
    if (name === 'quantity' && parseInt(value) < 0) {
      error = 'Quantité négative non autorisée';
    }
    ```
* ✅ Backend : `api/books.py`

  * Route `POST /api/books` et `PUT /api/books/<id>`

    ```python
    if quantity < 0:
        return jsonify({"message": "La quantité ne peut pas être négative."}), 400
    ```

---



## 🔁 Notes sur la gestion des sessions

* Une fois connecté, le **token JWT reste stocké** dans `localStorage` du navigateur
* Il **n'expire pas automatiquement** sauf si une durée a été définie dans `JWTManager`
* Pour simuler une déconnexion : supprimer manuellement le token dans le navigateur ou prévoir un bouton de logout qui exécute `localStorage.removeItem('token')`
* Actuellement **aucune session ne se clôt automatiquement** après consultation ou inactivité

---

## 🧠 Diagnostic de l’utilisateur connecté

* Pour savoir **quel utilisateur a ajouté un livre**, observer la valeur de `user_id` dans la base (`Book.user_id`)
* Seuls les livres associés au `get_jwt_identity()` courant seront listés ou modifiables par cet utilisateur connecté


## 📄 Licence et version

* Flask 3.1.1 – SQLite (ou autre URI configurable)
* Code open-source, modifiable à souhait

---

