# Utiliser Node.js comme base
FROM node:18

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de l'API
COPY package*.json ./
RUN npm install

COPY . .

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]