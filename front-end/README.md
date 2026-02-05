# 🎓 Front-End - JeanCadémie

Application web Vue.js pour la plateforme e-learning JeanCadémie.

## 📋 Description

**JeanCadémie** est une plateforme e-learning permettant :
- La création et gestion de **modules de cours**
- Des **leçons** avec éditeur de contenu
- Des **exercices de code** et **quiz** interactifs
- L'**exécution de code** (Python/Java) via Monaco Editor
- Un système de **rôles** (Étudiant, Enseignant, Admin)
- Un **back-office** administrateur
- Des **statistiques** pour les enseignants

## 🛠️ Technologies

| Technologie | Version | Usage |
|-------------|---------|-------|
| Vue.js | 3.5 | Framework frontend |
| Vite | 6 | Bundler |
| Tailwind CSS | 3.4 | Styling |
| Pinia | 2.3 | State management |
| Vue Router | 4.5 | Routing |
| Axios | 1.7 | HTTP Client |
| Monaco Editor | 0.52 | Éditeur de code |
| Chart.js | - | Graphiques |

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## 📂 Structure du Projet

```
src/
├── App.vue
├── main.js
├── assets/
│   └── main.css          # Styles globaux + Tailwind
├── components/
│   ├── metier/           # Composants métier
│   │   ├── cours/
│   │   ├── exercice/
│   │   ├── module/
│   │   └── statistiques/
│   └── structure/        # Composants UI réutilisables
│       ├── HeaderComposant.vue
│       ├── FooterComposant.vue
│       ├── Modal.vue
│       ├── buttons/
│       ├── chart/
│       ├── forms/
│       └── list/
├── composables/          # Hooks réutilisables
│   ├── admin.js          # Gestion admin
│   ├── graph.js          # Graphiques
│   ├── lesson.js         # Gestion leçons
│   ├── module.js         # Gestion modules
│   └── user.js           # Gestion utilisateur
├── plugins/
│   └── api.js            # Configuration Axios
├── router/               # Routes Vue Router
├── stores/               # Stores Pinia
│   ├── user.js           # Auth, profil, rôles
│   └── lesson.js         # Brouillon de leçon
└── views/                # Pages/Vues
```

## 🛣️ Routes

### Routes publiques

| Route | Page |
|-------|------|
| `/accueil` | Page d'accueil |
| `/modules` | Liste des modules |
| `/modules/{id}` | Détail d'un module |

### Routes étudiant (auth requise)

| Route | Page |
|-------|------|
| `/modules/{id}/lessons/{id}` | Leçon |
| `/modules/{id}/lessons/{id}/content` | Contenu de leçon |
| `/feed` | Fil d'actualité |
| `/profile/{id}` | Profil utilisateur |

### Routes enseignant

| Route | Page |
|-------|------|
| `/teacher/modules` | Mes modules |
| `/teacher/modules/{id}` | Éditer un module |
| `/teacher/modules/{id}/lesson/create` | Créer une leçon |
| `/teacher/statistics` | Statistiques |

### Routes admin

| Route | Page |
|-------|------|
| `/admin` | Back-office |
| `/admin/users` | Gestion utilisateurs |
| `/admin/modules` | Gestion modules |
| `/admin/demandes` | Gestion demandes |

## 🔐 Rôles

| Rôle | Valeur | Permissions |
|------|--------|-------------|
| Étudiant | `0` | Consultation, progression |
| Enseignant | `50` | Création de contenu |
| Admin | `100` | Administration complète |

## 🎨 Thème

Le thème supporte le **mode sombre/clair** via Tailwind CSS.

Couleurs principales :
- **Primary** : Bleu (`#3B82F6`)
- **Secondary** : Vert émeraude (`#10B981`)

## ⚙️ Configuration

### Variables d'environnement

```env
VITE_API_URL=http://localhost:44311
```

### Configuration API (`src/plugins/api.js`)

- **Base URL** : Variable d'environnement `VITE_API_URL`
- **Timeout** : 30 secondes
- **Intercepteurs** : 
  - Ajout automatique du token JWT
  - Refresh token automatique en cas de 401

## 🐳 Docker

**Port exposé** : `44310`

```bash
# Lancer le frontend
docker-compose up frontend.jeancademie
```

Le conteneur exécute automatiquement `npm install && npm run build && npm run preview`.
