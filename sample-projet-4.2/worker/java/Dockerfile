FROM openjdk:20-jdk-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /code

COPY hamcrest-core-1.3.jar ./
COPY junit-4.12.jar ./

# Installer les dépendances nécessaires (par exemple, bash)
RUN apt update && apt install -y bash default-jdk jq
