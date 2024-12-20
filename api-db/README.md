# Service de base de données
Ce service est un service de base de données POSTGRES qui permet de stocker des données de manière persistante et accessible via une API REST PHP.

## Installation

Pour installer le service de base de données, il suffit de lancer la commande suivante:
```bash
cd api-db
cd app
composer install
cd ../
docker-compose up -d
```

## Utilisation

Pour se connecter à Adminer et gérer la base de données , il fait aller sur l'adresse suivante:
```
localhost:5433
```

Pour l'API, il fait aller sur l'adresse suivante:
```
localhost:8889
```