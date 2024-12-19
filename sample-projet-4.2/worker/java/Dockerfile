FROM node:18

# Installer OpenJDK (par exemple OpenJDK 11)
RUN apt-get update && apt-get install -y --no-install-recommends \
    openjdk-17-jdk \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /usr/src/worker

# Copier les fichiers nécessaires au Worker
COPY package*.json ./
COPY ./packageTest/hamcrest-core-1.3.jar ./
COPY ./packageTest/junit-4.12.jar ./

RUN npm install
COPY .. .

# Vérifier l'installation de Java
RUN java -version

# Démarrer le Worker
CMD ["node", "index.js"]

EXPOSE 4000