# 🎓 JeanCadémie

Plateforme e-learning complète avec architecture microservices.

## 📋 Description

JeanCadémie est une plateforme d'apprentissage en ligne permettant :
- 📚 La création et consultation de **modules de cours**
- 📝 Des **leçons** interactives avec texte, code et quiz
- ⚡ L'**exécution de code** en ligne (Java, Python)
- 👥 Un système de **rôles** (Étudiant, Enseignant, Admin)
- 📊 Des **statistiques** de progression

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Vue.js)                         │
│                         Port: 44310                              │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│                      GATEWAY (API Gateway)                        │
│                         Port: 44311                               │
└───────┬─────────────┬─────────────┬─────────────┬────────────────┘
        │             │             │             │
        ▼             ▼             ▼             ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐
│  API Auth   │ │  API Cours  │ │ API User    │ │  API Execution  │
│  Port:44314 │ │  Port:44312 │ │ Port:44313  │ │   Port:44315    │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └───────┬─────────┘
       │               │               │                │
       ▼               ▼               ▼                ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐
│  PostgreSQL │ │   MongoDB   │ │  PostgreSQL │ │   Redis + Workers│
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────────┘
```

## 🛠️ Stack Technique

| Service | Technologies |
|---------|--------------|
| **Frontend** | Vue.js 3, Vite, Tailwind CSS, Pinia |
| **Gateway** | PHP 8.3, Slim 4 |
| **API Auth** | PHP 8.3, Slim 4, PostgreSQL, JWT |
| **API Cours** | PHP 8.3, Slim 4, MongoDB |
| **API Utilisateur** | PHP 8.3, Slim 4, PostgreSQL |
| **API Execution** | Node.js, Express, Redis Streams |

## 🚀 Démarrage Rapide

### Prérequis

- Docker & Docker Compose
- Fichiers d'environnement configurés (voir `.env.exemple`)

### Configuration des environnements

```bash
# Copier les fichiers d'environnement
cp api-auth/env/auth.env.exemple api-auth/env/auth.env
cp api-auth/env/db.env.exemple api-auth/env/db.env
cp api-cours/env/db.env.exemple api-cours/env/db.env
cp api-cours/env/mongoexpress.env.exemple api-cours/env/mongoexpress.env
cp api-utilisateur/env/db.env.exemple api-utilisateur/env/db.env
```

### Environnement de développement

```bash
# Lancer tous les services (ports exposés pour debug)
docker-compose up -d

# Ou utiliser le Makefile
make up
```

### Environnement de production

```bash
# Lancer sans ports exposés (nécessite un reverse proxy)
docker-compose -f docker-compose.prod.yaml up -d
```

### Accès aux services (développement)

| Service | URL |
|---------|-----|
| 🌐 Frontend | http://localhost:44310 |
| 🚪 Gateway API | http://localhost:44311 |
| 📚 API Cours | http://localhost:44312 |
| 👤 API Utilisateur | http://localhost:44313 |
| 🔐 API Auth | http://localhost:44314 |
| ⚡ API Execution | http://localhost:44315 |
| 🗄️ Adminer (DB) | http://localhost:44316 |
| 🍃 MongoDB | http://localhost:44317 |
| 📊 Mongo Express | http://localhost:44318 |
| 🔴 Redis | http://localhost:44319 |

---

## 🔀 Configuration avec Traefik (Production)

En production, seuls le **Frontend** et le **Gateway** doivent être exposés via votre reverse proxy.  
Les autres microservices communiquent uniquement via le réseau Docker interne.

### Labels à ajouter

Ajoutez ces labels dans `docker-compose.prod.yaml` sur les services concernés :

**Frontend** :
```yaml
frontend.jeancademie:
  labels:
    - "traefik.enable=true"
    - "traefik.http.routers.frontend.rule=Host(`votre-domaine.fr`)"
    - "traefik.http.routers.frontend.entrypoints=websecure"
    - "traefik.http.routers.frontend.tls.certresolver=letsencrypt"
    - "traefik.http.services.frontend.loadbalancer.server.port=4173"
```

**Gateway** :
```yaml
gateway.jeancademie:
  labels:
    - "traefik.enable=true"
    - "traefik.http.routers.api.rule=Host(`api.votre-domaine.fr`)"
    - "traefik.http.routers.api.entrypoints=websecure"
    - "traefik.http.routers.api.tls.certresolver=letsencrypt"
    - "traefik.http.services.api.loadbalancer.server.port=80"
```

> ⚠️ **Important** : Ne mettez PAS de labels Traefik sur les autres services (api-auth, api-cours, etc.). Ils doivent rester internes et accessibles uniquement via le Gateway.

### Architecture en production

```
                    INTERNET
                        │
                        ▼
              ┌─────────────────┐
              │     Traefik     │  ← Votre reverse proxy existant
              └────────┬────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
         ▼                           ▼
┌─────────────────┐        ┌─────────────────┐
│    Frontend     │        │     Gateway     │
│   (port 4173)   │        │   (port 80)     │
└─────────────────┘        └────────┬────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
              ┌──────────┐   ┌──────────┐   ┌──────────┐
              │ api-auth │   │api-cours │   │ api-user │
              └──────────┘   └──────────┘   └──────────┘
                   │               │               │
              (PostgreSQL)    (MongoDB)      (PostgreSQL)
```

## 📂 Structure du Projet

```
jeancademi/
├── docker-compose.yaml     # Orchestration des services
├── Makefile                # Commandes utilitaires
├── README.md               # Ce fichier
│
├── api-auth/               # Service d'authentification
│   ├── app/                # Code source PHP
│   ├── build/              # Dockerfile
│   ├── env/                # Variables d'environnement
│   └── sql/                # Scripts d'initialisation
│
├── api-cours/              # Service de gestion des cours
│   ├── app/                # Code source PHP
│   ├── build/              # Dockerfile
│   ├── env/                # Variables d'environnement
│   └── sql/                # Scripts MongoDB
│
├── api-execution/          # Service d'exécution de code
│   ├── router/             # API Express
│   └── worker/             # Workers Java/Python
│
├── api-utilisateur/        # Service de gestion utilisateurs
│   ├── app/                # Code source PHP
│   ├── build/              # Dockerfile
│   ├── env/                # Variables d'environnement
│   └── sql/                # Scripts d'initialisation
│
├── front-end/              # Application Vue.js
│   ├── src/                # Code source
│   └── public/             # Assets statiques
│
├── gateway/                # API Gateway
│   ├── config/             # Configuration Slim
│   ├── src/                # Code source PHP
│   └── build/              # Dockerfile
│
└── user-pictures/          # Stockage des images de profil
```

## 🔐 Rôles Utilisateur

| Rôle | Valeur | Permissions |
|------|--------|-------------|
| 👨‍🎓 Étudiant | `0` | Consulter les cours, suivre sa progression |
| 👨‍🏫 Enseignant | `50` | Créer et gérer ses propres modules |
| 👑 Admin | `100` | Administration complète de la plateforme |

## 📖 Documentation des Services

Chaque microservice possède son propre README avec documentation détaillée :

- [API Auth](./api-auth/README.md)
- [API Cours](./api-cours/README.md)
- [API Execution](./api-execution/README.md)
- [API Utilisateur](./api-utilisateur/README.md)
- [Frontend](./front-end/README.md)
- [Gateway](./gateway/README.md)

## 🧪 Tests

```bash
# Lancer les tests PHP
cd api-auth/app && composer test
cd api-cours/app && composer test
cd api-utilisateur/app && composer test
```

## 📝 License

Projet académique - JeanCadémie
