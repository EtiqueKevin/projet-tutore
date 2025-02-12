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

## Code de report signification

- Commence par 1 : Signalement d'un utilisateur
    - Suivi de 1 : Signalement pour usurpation d'identité
    - Suivi de 2 : Signalement pour contenu inapproprié (photo, nom, prénom, etc.)
    - Suivi de 3 : Signalement pour comportement inapproprié

- Commence par 2 : Signalement d'un commentaire
    - Suivi de 1 : Signalement pour contenu inapproprié
    - Suivi de 2 : Signalement pour spam

- Commence par 3 : Signalement d'un module
    - Suivi de 1 : Signalement pour contenu inapproprié
    - Suivi de 2 : Signalement pour contenu ne correspondant pas à la description
    - Suivi de 3 : Signalement pour erreur dans le module

- Commence par 4 : Signalement d'une leçon
    - Suivi de 1 : Signalement pour contenu inapproprié
    - Suivi de 2 : Signalement pour contenu ne correspondant pas à la description
    - Suivi de 3 : Signalement pour erreur dans la leçon, exercice ou autre

- SUIVI PAR 0 : Signalement pour AUTRE