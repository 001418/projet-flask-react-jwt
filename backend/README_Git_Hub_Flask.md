# 📘 README – Dépôt GitHub : projet-flask-react-jwt

---

## 🎯 Objectif

Ce dépôt contient le projet complet Flask + React avec authentification JWT.

Lien du dépôt GitHub :
👉 [https://github.com/001418/projet-flask-react-jwt](https://github.com/001418/projet-flask-react-jwt)

---

## 🔐 Étapes pour accéder et pusher le projet

### 1. Initialiser le dépôt (si ce n'est pas déjà fait)

```bash
cd "Projet Flask à envoyer"
git init
git add .
git commit -m "Initial commit"
```

### 2. Ajouter le dépôt distant (avec ou sans token)

**Méthode sécurisée (avec token personnel)** :

```bash
git remote add origin https://<TOKEN>@github.com/001418/projet-flask-react-jwt.git
```
🔐 Pour générer un token :

Aller dans GitHub > Settings

Descendre jusqu'à Developer settings

Aller sur Personal access tokens > Tokens (classic)

Cliquer sur Generate new token

Sélectionner les scopes nécessaires (repo, workflow, etc.)

**Après premier push, retirer le token de l'URL pour sécurité :**

```bash
git remote set-url origin https://github.com/001418/projet-flask-react-jwt.git
```

---

### 3. Pousser le projet vers GitHub

```bash
git push -u origin master
```

> 🚨 Si le push échoue avec `403`, vérifier :
>
> * Que le dépôt t'appartient (ou que tu es collaborateur)
> * Que tu n'utilises pas les identifiants d’un autre compte
> * Supprimer les anciens identifiants :

```bash
git credential-manager-core erase
```
ou supprimer manuellement via Gestionnaire d'identifiants Windows
---

## 🧪 Vérification post-push

```bash
git remote -v
```

Attendu :

```
origin  https://github.com/001418/projet-flask-react-jwt.git (fetch)
origin  https://github.com/001418/projet-flask-react-jwt.git (push)
```

```bash
git config user.name
# 001418

git config user.email
# benoit.robart.edu@groupe-gema.com
```

---

## 📦 Archive manuelle (si besoin de .tar.gz)

```bash
tar -czf projet-flask-complet.tar.gz "Projet Flask à envoyer"
```

> ⚠️ Vérifie les permissions sur `books.db` si erreur "Permission denied"

---

## 🔁 Déploiement ultérieur (planifié)

1. Instanciation d’un cloud
2. Création d’un serveur
3. Déploiement API Flask + React
4. Mise en place du monitoring
5. Planification de la maintenance système

---

## ✅ Statut actuel

* 📤 Dépôt **poussé avec succès**
* 🔒 Token retiré
* 🧾 Prêt pour dépôt final

---

## Auteur

**001418 alias khun1964 alias Benoît Robart** – Projet validé le 24/05/2025
