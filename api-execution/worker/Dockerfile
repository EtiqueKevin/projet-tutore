FROM node:22-alpine

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk \
    PATH=$PATH:/usr/lib/jvm/java-17-openjdk/bin

RUN apk add --no-cache \
    openjdk17 \
    ca-certificates \
    bash

RUN java -version && javac -version

# Définir le répertoire de travail
WORKDIR /usr/src/worker
