# Utiliser Node.js comme base
FROM node:18

# Installer les outils nécessaires pour Docker-in-Docker
RUN apt-get update && apt-get install -y --no-install-recommends \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && apt-get install -y --no-install-recommends \
    docker-ce-cli && \
    rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /usr/src/worker

# Copier les fichiers nécessaires au Worker
COPY package*.json ./
RUN npm install
COPY . .



# Démarrer le Worker
CMD ["node", "worker.js"]
