# Service de l'API de gestion

Ce service permet de gérer les principaux éléments de l'application comme les utilisateurs, les cours, les exercices, les commentaires, etc. 
Il va récupérer les données de la base de données et compléter les requêtes HTTP du client si nécessaire.
Ce service est fait en PHP avec SLIM.

## Installation

Pour installer le service de l'API de gestion, il faut d'abord installer les dépendances avec la commande suivante:
```bash
cd api-gestion
cd app
composer install
cd ../
docker-compose up -d
```

## Utilisation

Pour utiliser l'API de gestion, il faut aller sur l'adresse suivante:
```
http://localhost:8888
```