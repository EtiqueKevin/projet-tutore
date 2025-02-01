# Service de l'API de gestion

Ce service permet de gérer les cours et les exercices en utilisant une API REST réalisé en PHP avec le framework SLIM.

## Installation

Pour installer le service de l'API de gestion, il faut d'abord installer les dépendances avec la commande suivante:
```bash
docker compose run --rm api.cours.jeancademie composer install
docker-compose up -d
```

## Utilisation

Pour utiliser l'API de gestion, il faut aller sur l'adresse suivante (utilisation par le gateway):
```
http://localhost:8888
```