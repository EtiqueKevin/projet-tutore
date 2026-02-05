# 📚 API Cours - JeanCadémie

Service de gestion des cours et exercices pour la plateforme JeanCadémie.

## 📋 Description

Ce microservice gère :
- Les **modules** (regroupements de leçons par thématique)
- Les **leçons** (contenus pédagogiques avec texte, exercices de code et quiz)
- Les **erreurs** liées aux leçons (statistiques d'erreurs)

## 🛠️ Technologies

| Technologie | Version |
|-------------|---------|
| PHP | 8.3 |
| Slim Framework | 4.14 |
| MongoDB | Latest |
| Firebase JWT | 6.10 |
| Guzzle HTTP | 7.0 |

## 🚀 Endpoints

### Modules

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| `GET` | `/modules` | Liste tous les modules | ❌ |
| `GET` | `/users/modules` | Modules par professeur | ✅ |
| `POST` | `/modules` | Créer un module | ✅ |
| `GET` | `/modules/{id}` | Détail d'un module | ❌ |
| `PUT` | `/modules/{id}` | Modifier un module | ✅ |
| `DELETE` | `/modules/{id}` | Supprimer un module | ✅ |

### Leçons

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| `GET` | `/modules/{id}/lessons` | Leçons d'un module | ❌ |
| `POST` | `/modules/{id}/lessons` | Créer une leçon | ✅ |
| `GET` | `/lessons/{id}` | Détail d'une leçon | ❌ |
| `PUT` | `/lessons/{id}` | Modifier une leçon | ✅ |
| `DELETE` | `/lessons/{id}` | Supprimer une leçon | ✅ |
| `GET` | `/lessons/{id}/erreurs` | Erreurs d'une leçon | ❌ |

## 🗄️ Base de Données MongoDB

### Collection `modules`

```javascript
{
  _id: UUID,
  id_creator: UUID,        // ID du créateur/professeur
  name: String,            // Nom du module
  description: String,     // Description
  nblesson: Number,        // Nombre de leçons
  date_update: Date
}
```

### Collection `lessons`

```javascript
{
  _id: UUID,
  name: String,
  description: String,
  type: String,            // "langage", etc.
  content: [
    {
      index: Number,
      type: "text" | "code" | "quizz",
      content: String,     // Texte Markdown
      files: [...],        // Pour type "code"
      questions: [...]     // Pour type "quizz"
    }
  ],
  date_update: Date
}
```

## 🏗️ Architecture

```
app/src/
├── application/
│   ├── actions/
│   │   ├── lesson/       # CRUD leçons + erreurs
│   │   └── module/       # CRUD modules
│   └── middleware/       # Auth & Authz
├── core/
│   ├── domain/entities/
│   │   ├── lesson/       # Lesson, Content, File, Question, Erreur
│   │   └── module/       # Module
│   ├── repositoryInterface/
│   └── services/         # LessonService, ModuleService
└── infrastructure/
    ├── LessonRepository.php
    ├── ModuleRepository.php
    └── Adapter*.php      # Clients HTTP externes
```

## ⚙️ Configuration

### MongoDB (`env/db.env`)

```env
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root
MONGO_INITDB_DATABASE=cours
```

### Mongo Express (`env/mongoexpress.env`)

```env
ME_CONFIG_MONGODB_SERVER=mongo.jeancademie
ME_CONFIG_BASICAUTH_USERNAME=user
ME_CONFIG_BASICAUTH_PASSWORD=user
```

## 🐳 Docker

**Port exposé** : `44312`

```bash
# Lancer le service avec MongoDB
docker-compose up api.cours.jeancademie mongo.jeancademie mongo-express
```

## 🔗 Communication Inter-services

- **api-auth** : `http://api.auth.jeancademie:80` - Validation JWT
- **api-utilisateur** : `http://api.utilisateur.jeancademie:80` - Infos utilisateurs
