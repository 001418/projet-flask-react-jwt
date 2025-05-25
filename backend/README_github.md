# 📘 README\_GIT – Dépôt GitHub pour projet Flask + React

---

## 🚀 Objectif du dépôt

Documenter la procédure **complète et reproductible** de création, configuration, push, et vérification d’un dépôt GitHub pour un projet local (ici : Flask + React). Ce guide résume la méthode utilisée pour le projet `projet-flask-react-jwt`.

---

## 🧱 Préparation du dossier local

### 🔧 Arborescence typique (répertoire local)

```
Projet Flask à envoyer/
├── backend/           # Code Flask
├── frontend/          # Code React
├── .gitignore         # Fichiers exclus
├── docker-compose.yml
├── README.md          # Documentation principale
```

### 📌 .gitignore recommandé

```
# Python
*.pyc
__pycache__/
instance/
.env

# Node
node_modules/
build/
dist/

# Autres
*.log
*.tmp
~$*
```

---

## 🧭 Étapes Git **en local** (PowerShell ou terminal Bash Git)

1. **Initialiser Git dans le projet local**

```bash
cd "D:/Projet Angular Node js Git/Projet Flask à envoyer"
git init
```

2. **Ajouter tous les fichiers (hors .gitignore)**

```bash
git add .
git commit -m "Initialisation dépôt Flask React"
```

3. **Configurer les infos d’utilisateur (si nécessaire)**

```bash
git config user.name "001418"
git config user.email "benoit.robart.edu@groupe-gema.com"
```

---

## 🌍 Connexion à GitHub avec Token

### 🔐 Étapes pour générer un **token GitHub**

1. Accéder à `https://github.com/settings/tokens`
2. Cliquer sur **"Developer settings"** (bas du menu gauche)
3. Choisir **"Personal access tokens"** → *Tokens classic*
4. Cliquer sur **"Generate new token"**, sélectionner :

   * `repo`
   * `workflow` *(si actions)*
   * **Expiration :** 7 jours ou +
5. Copier et **stocker temporairement** ce token.

---

## 🔁 Ajout du dépôt distant (GitHub)

### A. Avec token intégré (1ère fois uniquement) :

```bash
git remote add origin https://<TOKEN>@github.com/001418/projet-flask-react-jwt.git
```

### B. Revenir ensuite à l’URL standard :

```bash
git remote set-url origin https://github.com/001418/projet-flask-react-jwt.git
```

---

## ☁️ Push vers GitHub

```bash
git push -u origin master
```

> ✅ Si tout est correct, la branche `master` sera poussée sur GitHub avec vos fichiers visibles en ligne.

---

## ✅ Contrôle final

```bash
git remote -v
# Doit afficher deux lignes vers github.com/001418/projet-flask-react-jwt.git

git config user.name      # 001418
git config user.email     # benoit.robart.edu@groupe-gema.com
```

---

## 🧼 Nettoyage recommandé

```bash
git rm --cached "~$ujet Flask release3.docx"
git rm --cached "~WRL0003.tmp"
git rm --cached "README (2).md"
git commit -m "Suppression fichiers temporaires et doublons"
git push
```

---

## 📄 Résumé

| Étape              | Statut ✅      | Remarques                                                                              |
| ------------------ | ------------- | -------------------------------------------------------------------------------------- |
| Git initialisé     | ✅             | `git init` fait                                                                        |
| Commit effectué    | ✅             | `Initialisation dépôt`                                                                 |
| Token généré       | ✅             | Jeton long collé dans remote temporaire                                                |
| Push vers master   | ✅             | Visible sur GitHub                                                                     |
| Remote corrigé     | ✅             | URL du dépôt sans le token                                                             |
| Nom/auteur Git     | ✅             | 001418 / [benoit.robart.edu@groupe-gema.com](mailto:benoit.robart.edu@groupe-gema.com) |
| Nettoyage restants | 🔶 facultatif | fichiers Word temporaires à retirer                                                    |

---

✅ Dépôt GitHub opérationnel et prêt pour documentation ou déploiement.


📘 README Git est maintenant prêt. Il inclut :

* Toutes les étapes de création locale du dépôt.
* Configuration utilisateur.
* Génération et utilisation du token.
* Push sécurisé vers GitHub.
* Contrôles finaux (`remote -v`, `config`...).
* Et un tableau récapitulatif clair.

✅ Le dépôt est en ligne, le push fonctionne, tout est structuré.
📂 l’utiliser directement ou le transférer dans le dossier de documentation.


