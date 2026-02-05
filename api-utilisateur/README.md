# 👤 API Utilisateur - JeanCadémie

Service de gestion des utilisateurs pour la plateforme JeanCadémie.

## 📋 Description

Ce microservice gère :
- Les **profils utilisateurs** (CRUD)
- La **progression** des utilisateurs (leçons et modules)
- Les **évaluations/notes** des modules
- Les **demandes** (demandes de rôle enseignant)
- Les **images de profil**

## 🛠️ Technologies

| Technologie | Version |
|-------------|---------|
| PHP | 8.3 |
| Slim Framework | 4.14 |
| PostgreSQL | Latest |
| Firebase JWT | 6.10 |
| Guzzle HTTP | 7.0 |

## 🚀 Endpoints

### Utilisateurs

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| `GET` | `/user` | Utilisateur courant (par token) | ✅ |
| `GET` | `/users` | Liste tous les utilisateurs | ✅ Admin |
| `GET` | `/users/{id}` | Récupérer un utilisateur | ❌ |
| `POST` | `/users` | Créer un utilisateur | ❌ |
| `POST` | `/users/profile` | Modifier le profil | ✅ |
| `DELETE` | `/users/{id}` | Supprimer un utilisateur | ✅ Admin |

### Progression

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| `POST` | `/lessons/{id}/start_lesson` | Démarrer une leçon | ✅ |
| `POST` | `/lessons/{id}/finish_lesson` | Terminer une leçon | ✅ |
| `GET` | `/lessons/status` | Statut de toutes les leçons | ✅ |
| `GET` | `/lessons/{id}/status` | Statut d'une leçon | ✅ |
| `GET` | `/modules/status` | Statut de tous les modules | ✅ |
| `GET` | `/modules/{id}/status` | Statut d'un module | ✅ |
| `POST` | `/modules/{id}/rate` | Noter un module | ✅ |
| `GET` | `/modules/{id}/rate` | Obtenir la note | ❌ |

### Demandes

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| `GET` | `/demandes` | Liste des demandes | ✅ Admin |
| `POST` | `/demandes` | Créer une demande | ✅ |
| `POST` | `/demandes/{id}/validate` | Valider une demande | ✅ Admin |
| `DELETE` | `/demandes/{id}` | Supprimer une demande | ✅ Admin |

## 🗄️ Base de Données

### Table `users`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `name` | VARCHAR(50) | Prénom |
| `surname` | VARCHAR(50) | Nom |
| `pseudo` | VARCHAR(50) | Pseudo |
| `linkpic` | VARCHAR(255) | Image de profil |

### Table `user_lessons`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `id_lesson` | UUID | Référence leçon |
| `id_users` | UUID | Référence utilisateur |
| `status` | BOOLEAN | Terminé ou non |
| `date_update` | DATE | Dernière mise à jour |

### Table `user_modules`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `id_module` | UUID | Référence module |
| `id_users` | UUID | Référence utilisateur |
| `status` | BOOLEAN | Terminé ou non |
| `index` | SMALLINT | Index de progression |
| `rate` | SMALLINT | Note donnée |

### Table `demmands`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `id_utilisateur` | UUID | Utilisateur demandeur |

## 🏗️ Architecture

```
app/src/
├── application/
│   ├── actions/user/     # 20 actions HTTP
│   └── middleware/       # Auth & Authz
├── core/
│   ├── domain/entities/  # User, Demande
│   ├── repositoryInterface/
│   └── services/         # UsersService, AuthService
└── infrastructure/
    ├── adaptater/        # Clients HTTP externes
    └── repository/       # PDOUsersRepository
```

## ⚙️ Configuration

### Base de données (`env/db.env`)

```env
POSTGRES_DB=utilisateur
POSTGRES_USER=user
POSTGRES_PASSWORD=password
```

## 🐳 Docker

**Port exposé** : `44313`

```bash
# Lancer le service
docker-compose up api.utilisateur.jeancademie db.utilisateur.jeancademie
```

## 🔗 Communication Inter-services

- **api-auth** : `http://api.auth.jeancademie:80` - Authentification
- **api-cours** : `http://api.cours.jeancademie:80` - Données des cours/modules/leçons
