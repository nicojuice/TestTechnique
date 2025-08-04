# ✅ Task Manager — Projet Fullstack (Frontend + Backend)

Ce projet est une application simple de gestion de tâches (CRUD) avec un statut `pending` ou `done`, construite avec une architecture frontend/backend claire et conteneurisée via Docker.

---

## 🚀 Stack Technique

### Frontend
- **React** avec **Vite**
- **TypeScript**
- **TailwindCSS**

### Backend
- **Fastify** (Node.js)
- **TypeScript**
- Stockage en **mémoire** (pas de base de données pour l’instant)

### Infrastructure
- **Docker**
- **Docker Compose**
- **Makefile** (pour faciliter les commandes)

---

## 🛠️ Lancer le projet

### 📦 Prérequis
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optionnel) [Make](https://www.gnu.org/software/make/) pour utiliser le `Makefile`

---

### 🔧 1. Build & Lancement via Makefile

```bash
make up         # Build et démarre tous les services
make logs       # Voir les logs
make sh-back    # Entrer dans le conteneur backend
make sh-front   # Entrer dans le conteneur frontend
make down       # Pour arreter tout les services

Sinon il est possibkle de lancer le projet via DockerCompose

- Aller a la racine du projet et faire docker compose up --build
- Et ne pas oublier de faire docker compose down -v quand on veux arreter le projet, je conseille aussi de docker system prune -af pour la suppression du cache de docker


