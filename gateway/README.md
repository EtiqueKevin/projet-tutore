# 🚪 Gateway - JeanCadémie

API Gateway (reverse proxy) pour l'architecture microservices de JeanCadémie.

## 📋 Description

Le Gateway est le **point d'entrée unique** pour tous les microservices. Il :
- **Route les requêtes** vers les différents microservices backend
- **Centralise l'authentification** via un middleware JWT
- **Gère les CORS** pour les requêtes cross-origin
- **Proxie les requêtes** de manière transparente

## 🛠️ Technologies

| Technologie | Version |
|-------------|---------|
| PHP | 8.3 |
| Slim Framework | 4.14 |
| Guzzle HTTP | 7.0 |
| Firebase JWT | 6.10 |

## 🏗️ Architecture

```
┌─────────────────────┐
│   Client (Frontend) │
└──────────┬──────────┘
           │ HTTP Request
           ▼
┌─────────────────────────────────────────┐
│            GATEWAY (port 44311)         │
│  ┌─────────────────────────────────┐    │
│  │  1. Middleware CORS             │    │
│  │  2. Middleware Auth (si requis) │    │
│  │     → Valide JWT via api-auth   │    │
│  │  3. GeneriqueAction             │    │
│  │     → Proxy vers microservice   │    │
│  └─────────────────────────────────┘    │
└──────────┬──────────────────────────────┘
           │
     ┌─────┴─────┬─────────────┬────────────┐
     ▼           ▼             ▼            ▼
┌─────────┐ ┌─────────┐ ┌──────────┐ ┌───────────┐
│api-cours│ │api-auth │ │api-user  │ │api-exec   │
│  :80    │ │  :80    │ │  :80     │ │  :3000    │
└─────────┘ └─────────┘ └──────────┘ └───────────┘
```

## 🚀 Routes

### API Cours → `http://api.cours.jeancademie:80`

| Méthode | Route | Auth |
|---------|-------|------|
| GET | `/modules` | ❌ |
| POST | `/modules` | ✅ |
| GET | `/modules/{id}` | ❌ |
| PUT/DELETE | `/modules/{id}` | ✅ |
| GET | `/modules/{id}/lessons` | ❌ |
| POST | `/modules/{id}/lessons` | ✅ |
| GET/PUT/DELETE | `/lessons/{id}` | ✅ |
| GET | `/users/modules` | ✅ |

### API Auth → `http://api.auth.jeancademie:80`

| Méthode | Route | Auth |
|---------|-------|------|
| POST | `/signin` | ❌ |
| POST | `/register` | ❌ |
| POST | `/refresh` | ✅ |

### API Utilisateur → `http://api.utilisateur.jeancademie:80`

| Méthode | Route | Auth |
|---------|-------|------|
| GET | `/user` | ✅ |
| GET | `/users` | ✅ |
| GET | `/users/{id}` | ❌ |
| POST | `/users/profile` | ✅ |
| DELETE | `/users/{id}` | ✅ |
| POST | `/lessons/{id}/start_lesson` | ✅ |
| POST | `/lessons/{id}/finish_lesson` | ✅ |
| POST | `/modules/{id}/rate` | ✅ |
| GET/POST | `/demandes` | ✅ |
| POST | `/demandes/{id}/validate` | ✅ |
| DELETE | `/demandes/{id}` | ✅ |

### API Execution → `http://api.execution:3000`

| Méthode | Route | Auth |
|---------|-------|------|
| POST | `/{language}` | ❌ |
| POST | `/teacher/{language}` | ❌ |

## 📂 Structure du Code

```
gateway/
├── build/
│   ├── 8.3-cli.Dockerfile
│   └── php.ini
├── config/
│   ├── bootstrap.php       # Initialisation Slim + DI
│   ├── dependencies.php    # Actions & Middleware DI
│   ├── routes.php          # Définition des routes
│   └── settings.php        # URLs des microservices
├── public/
│   └── index.php           # Point d'entrée
├── src/
│   └── application/
│       ├── actions/
│       │   ├── GeneriqueAuthnAction.php
│       │   ├── GeneriqueCoursAction.php
│       │   ├── GeneriqueExecutionAction.php
│       │   └── GeneriqueUtilisateurAction.php
│       └── middleware/
│           ├── AuthMiddleware.php
│           └── Cors.php
└── composer.json
```

## ⚙️ Configuration

### URLs des Microservices (`config/settings.php`)

| Service | URL |
|---------|-----|
| api-utilisateur | `http://api.utilisateur.jeancademie:80` |
| api-cours | `http://api.cours.jeancademie:80` |
| api-execution | `http://api.execution:3000` |
| api-auth | `http://api.auth.jeancademie:80` |

### CORS Autorisés

- `http://localhost:44310`
- `http://jeancademie.paul-bruson.fr`
- `https://jeancademie.paul-bruson.fr`

## 🐳 Docker

**Port exposé** : `44311`

```bash
# Lancer le gateway
docker-compose up gateway.jeancademie
```
