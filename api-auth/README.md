# 🔐 API Auth - JeanCadémie

Service d'authentification et d'autorisation pour la plateforme JeanCadémie.

## 📋 Description

Ce microservice gère :
- L'inscription et la connexion des utilisateurs
- La génération et validation de tokens JWT
- La gestion des rôles utilisateurs
- La communication avec le service utilisateur via HTTP

## 🛠️ Technologies

| Technologie | Version |
|-------------|---------|
| PHP | 8.3 |
| Slim Framework | 4.14 |
| PostgreSQL | Latest |
| Firebase JWT | 6.10 |
| Guzzle HTTP | 7.0 |

## 🚀 Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/signin` | Connexion utilisateur |
| `POST` | `/register` | Inscription utilisateur |
| `POST` | `/token/refresh` | Rafraîchir le token JWT |
| `POST` | `/token/validate` | Valider un token JWT |
| `POST` | `/token/users/id` | Récupérer l'ID utilisateur depuis le token |
| `DELETE` | `/users/{id}` | Supprimer un utilisateur |
| `GET` | `/users/{id}/role` | Récupérer le rôle d'un utilisateur |
| `GET` | `/users/{id}/email` | Récupérer l'email d'un utilisateur |
| `PUT` | `/users/{ID-USER}/role` | Modifier le rôle (protégé) |

## 🗄️ Base de Données

**Table `users`** (PostgreSQL) :

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `role` | SMALLINT | Rôle (0=user, 100=admin) |
| `email` | VARCHAR(100) | Email unique |
| `password` | VARCHAR(255) | Mot de passe hashé |
| `date_signup` | DATE | Date d'inscription |
| `date_signin` | DATE | Dernière connexion |

## 🏗️ Architecture

```
src/
├── application/          # Couche Application
│   ├── actions/          # Controllers HTTP
│   ├── middleware/       # Auth & Authz
│   └── providers/        # JWT Provider
├── core/                 # Couche Domaine
│   ├── domain/entities/  # Entités métier
│   ├── repositoryInterface/
│   └── services/         # AuthService, UserService
└── infrastructure/       # Couche Infrastructure
    ├── adaptater/        # Client HTTP vers api-utilisateur
    └── repositories/     # PDOAuthRepository
```

## ⚙️ Configuration

### Variables d'environnement (`env/auth.env`)

```env
JWT_SECRET_KEY=<votre_clé_secrète_jwt>
```

### Base de données (`env/db.env`)

```env
POSTGRES_DB=auth
POSTGRES_USER=user
POSTGRES_PASSWORD=password
```

## 🐳 Docker

**Port exposé** : `44314`

```bash
# Lancer le service
docker-compose up api.auth.jeancademie db.auth.jeancademie
```

## 🔗 Communication Inter-services

- **api-utilisateur** : `http://api.utilisateur.jeancademie:80` - Gestion des profils utilisateurs
