# Utilise une image Node officielle
FROM node:18

# Répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port React
EXPOSE 3000

# Commande de démarrage React
CMD ["npm", "start"]
