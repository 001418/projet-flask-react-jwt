# 🧪 DEBUG – Problèmes fréquents avec /api/register (Flask + React)

---

## 📍 Symptôme courant

> "Erreur réseau." après tentative de soumission du formulaire d'inscription depuis React

---

## 🔍 Étapes de diagnostic

### ✅ 1. Vérifier que le serveur Flask est actif

```bash
cd backend
.venv\Scripts\Activate.ps1
python app.py
```

Tu dois voir dans la console :

```
* Running on http://127.0.0.1:5000/
```

---

### ✅ 2. Tester manuellement l'API

```bash
curl -X POST http://localhost:5000/api/register \
 -H "Content-Type: application/json" \
 -d '{"email":"test@demo.com", "password":"123456"}'
```

Tu dois obtenir :

```json
{"message": "Utilisateur créé"}
```

Sinon, le backend a un souci : consulte la console.

---

### ✅ 3. Corriger la validation email si besoin

Dans `auth.py` :

```python
def is_valid_email(email):
    return re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", email)  # ❌
```

Remplacer par :

```python
def is_valid_email(email):
    return re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", email)  # ✅ sans double antislash !
```

Redémarrer Flask.

---

### ✅ 4. Vérifier l'URL dans le frontend

Dans `Register.js` ou équivalent :

```js
fetch("http://127.0.0.1:5000/api/register", { ... })
```

Pas d'`/register` seul, ni `/api` manquant, sinon : **404 ou erreur réseau**.

---

### ✅ 5. Vérifier que la requête atteint bien le backend

Dans la console Flask :

```text
127.0.0.1 - - "POST /api/register HTTP/1.1" 201 -
```

Si **aucune requête n’apparaît**, c’est que :

* le frontend est mal configuré (mauvaise URL)
* ou le serveur est arrêté

---

## 🧯 Si tu veux forcer la création de l'utilisateur

Lancer manuellement dans `Python` :

```python
from app import create_app
from models import db, User
app = create_app()
with app.app_context():
    user = User(email="test@a.com")
    user.set_password("123456")
    db.session.add(user)
    db.session.commit()
```

---

## ✅ À faire si tout est OK

1. Tente une inscription réelle depuis React
2. Vérifie dans la console backend la réception
3. En cas d’échec, regarde la **console navigateur F12 > Réseau**

---

## 📌 Bonus : ajouter une route `/` dans `app.py`

```python
@app.route("/")
def index():
    return {"message": "✅ API Flask opérationnelle"}
```

Pour tester à la main depuis un navigateur que le backend tourne.

---
