# Nom du projet (optionnel)
PROJECT_NAME=my-app

# Docker Compose
DC=docker compose

# Conteneurs/services
FRONT=frontend
BACK=backend

# Commandes principales

.PHONY: help build up down restart logs sh-front sh-back

help:
	@echo ""
	@echo "Commandes disponibles :"
	@echo "  make build        - Build des images Docker"
	@echo "  make up           - Lancement des services (en arrière-plan)"
	@echo "  make down         - Arrêt et suppression des conteneurs"
	@echo "  make restart      - Redémarrage propre du projet"
	@echo "  make logs         - Affiche les logs"
	@echo "  make sh-front     - Shell dans le conteneur frontend"
	@echo "  make sh-back      - Shell dans le conteneur backend"
	@echo ""

build:
	$(DC) build

up:
	$(DC) up -d

down:
	$(DC) down

restart: down build up

logs:
	$(DC) logs -f

sh-front:
	$(DC) exec $(FRONT) sh

sh-back:
	$(DC) exec $(BACK) sh
