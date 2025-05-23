# Utilise une image Python officielle allégée
FROM python:3.11-slim

# Répertoire de travail
WORKDIR /app

# Copier les dépendances
COPY requirements.txt .

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste de l’application (y compris le dossier `api/`)
COPY . .

# Exposer le port Flask
EXPOSE 5000

# Définir les variables d’environnement pour Flask
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV PYTHONUNBUFFERED=1

# Lancer le serveur Flask
CMD ["flask", "run"]
