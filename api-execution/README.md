# ⚡ API Execution - JeanCadémie

Service d'exécution de code à distance pour la plateforme JeanCadémie.

## 📋 Description

Ce microservice permet :
- L'**exécution de code** dans un environnement sécurisé et isolé
- La validation automatique des exercices via **tests unitaires**
- Le support de multiples langages (**Java**, **Python**)
- Le retour d'**erreurs formatées** pour l'apprentissage

## 🛠️ Technologies

| Technologie | Usage |
|-------------|-------|
| Node.js | Runtime router & workers |
| Express.js | API REST |
| Redis Streams | File de messages router ↔ workers |
| Docker | Conteneurisation & isolation |
| JUnit 4 | Tests Java |
| Pytest | Tests Python |

## 🚀 Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/{language}` | Exécute le code d'un exercice (étudiant) |
| `POST` | `/teacher/{language}` | Exécute le code avec test fourni (professeur) |

### Paramètres

**Route étudiant** :
```json
{
  "id_lesson": "uuid",
  "index": 0,
  "codes": [{ "fileName": "Main.java", "code": "..." }]
}
```

**Route professeur** :
```json
{
  "codes": [{ "fileName": "Main.java", "code": "..." }],
  "fileTest": "TestMain.java",
  "testCode": "..."
}
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         ROUTER (Express)                         │
│  - Reçoit les requêtes HTTP (port 3000)                         │
│  - Publie dans Redis Streams                                     │
│  - Attend les résultats (timeout 10s)                           │
│  - Monitoring Docker (redémarre workers si arrêtés)             │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Redis Streams
        ┌───────────────────┴───────────────────┐
        ▼                                       ▼
┌───────────────────┐                 ┌───────────────────┐
│   WORKER JAVA     │                 │  WORKER PYTHON    │
│  (yoxan/node-java)│                 │(yoxan/node-python)│
│                   │                 │                   │
│ 1. Crée dir temp  │                 │ 1. Crée dir temp  │
│ 2. Écrit fichiers │                 │ 2. Écrit fichiers │
│ 3. Compile (javac)│                 │ 3. Exécute pytest │
│ 4. Exécute JUnit  │                 │ 4. Parse erreurs  │
│ 5. Retourne résult│                 │ 5. Retourne résult│
└───────────────────┘                 └───────────────────┘
```

## 📂 Structure du Code

```
api-execution/
├── router/
│   ├── index.js              # API Express
│   ├── monitoring_Docker.js  # Auto-restart des workers
│   ├── package.json
│   └── Dockerfile
├── worker/
│   ├── java/
│   │   ├── index.js          # Consumer Redis Java
│   │   └── executeCode.sh    # Script compilation/exécution
│   ├── python/
│   │   ├── index.js          # Consumer Redis Python
│   │   └── executeCode.sh    # Script pytest
│   ├── creation/
│   │   ├── CreateDir.js      # Création répertoires temp
│   │   └── CreateFiles.js    # Création fichiers sources
│   ├── traitement/
│   │   ├── TraitementCode.js # Exécution du code
│   │   └── TraitementErreur.js # Parsing des erreurs
│   └── logger.js
└── docker-compose.yml
```

## ⚙️ Configuration

### Variables d'environnement

| Variable | Valeur | Description |
|----------|--------|-------------|
| `REDIS_URL` | `redis://redis:6379` | URL de connexion Redis |

### Langages supportés

| Langage | Stream Redis | Stream Résultat |
|---------|--------------|-----------------|
| Java | `java_stream` | `result_java_stream` |
| Python | `python_stream` | `result_python_stream` |

## 🐳 Docker

**Ports exposés** :
- Router API : `44315`
- Redis : `44319`

```bash
# Lancer le service complet
docker-compose up api.execution redis java python
```

## 🔄 Flux d'Exécution

1. **Réception** : Le router reçoit une requête POST avec le code
2. **Publication** : Message publié dans le Redis Stream du langage
3. **Traitement** : Le worker crée un répertoire temporaire, écrit les fichiers
4. **Exécution** : Compilation (Java) ou exécution directe (Python) des tests
5. **Parsing** : Les erreurs sont formatées pour l'étudiant
6. **Retour** : Résultat publié dans le stream de résultat

## ⏱️ Timeout

- Timeout d'exécution : **10 secondes**
- Les workers sont auto-redémarrés toutes les 30 secondes si arrêtés
