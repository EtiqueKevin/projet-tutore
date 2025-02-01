# Service de base de données
Ce service est un service de gestion des utilisateurs de l'application. Il permet de gérer les utilisateurs, les rôles et les permissions. Ce service est réalisé en PHP avec le framework SLIM.
## Installation

Pour installer le service de base de données, il suffit de lancer la commande suivante:
```bash
docker compose run --rm api.utilisateur.jeancademie composer install 
docker-compose up -d
```

## Utilisation

Pour l'API, il fait aller sur l'adresse suivante:
```
localhost:8889
```