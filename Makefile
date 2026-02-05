# JeanCademie - Makefile
define copy_exemple
	@if [ ! -f $(1:.exemple=) ]; then \
		cp $(1) $(1:.exemple=); \
		echo "[+] $(1:.exemple=) > $(1)"; \
	fi
endef

define auth_setup
	@echo "\n[1/4] Configuration de l'API d'authentification"
	@echo "----------------------------------------"
	$(call copy_exemple,./api-auth/app/config/iniconf/auth.db.ini.exemple)
	$(call copy_exemple,./api-auth/env/auth.env.exemple)
	$(call copy_exemple,./api-auth/env/db.env.exemple)
	@read -p "Configurer les paramètres de la base de données? (y/N): " update_db; \
	if [ "$${update_db:-N}" = "y" ]; then \
		echo "\nConfiguration de la base de données:"; \
		read -p "Login administrateur (default: root): " db_user; \
		read -p "Mot de passe administrateur (default: root): " db_pass; \
		db_user=$${db_user:-root}; \
		db_pass=$${db_pass:-root}; \
		sed -i "s/POSTGRES_USER=.*/POSTGRES_USER=$$db_user/" ./api-auth/env/db.env; \
		sed -i "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$$db_pass/" ./api-auth/env/db.env; \
		sed -i "s/POSTGRES_DB=.*/POSTGRES_DB=auth/" ./api-auth/env/db.env; \
		sed -i "s/username=.*/username=$$db_user/" ./api-auth/app/config/iniconf/auth.db.ini; \
		sed -i "s/password=.*/password=$$db_pass/" ./api-auth/app/config/iniconf/auth.db.ini; \
		echo "✓ Configuration mise à jour avec succès!"; \
	fi; \
	read -p "Générer une nouvelle clée JWT? (y/N): " update_jwt; \
	if [ "$${update_jwt:-N}" = "y" ]; then \
		jwt_key=$$(openssl rand -hex 32); \
		sed -i "s/JWT_SECRET_KEY = .*/JWT_SECRET_KEY = '$$jwt_key'/" ./api-auth/env/auth.env; \
		echo "✓ Clée JWT générée avec succès"; \
	fi
endef

define cours_setup
	@echo "\n[2/4] Configuration de l'API des cours"
	@echo "----------------------------------------"
	$(call copy_exemple,./api-cours/app/config/iniconf/cours.db.ini.exemple)
	$(call copy_exemple,./api-cours/env/db.env.exemple)
	$(call copy_exemple,./api-cours/env/mongoexpress.env.exemple)
	@read -p "Configurer les paramètres de la base de données? (y/N): " update_db; \
	if [ "$${update_db:-N}" = "y" ]; then \
		echo "\nConfiguration de la base de données:"; \
		read -p "Login administrateur (default: root): " db_user; \
		read -p "Mot de passe administrateur (default: root): " db_pass; \
		db_user=$${db_user:-root}; \
		db_pass=$${db_pass:-root}; \
		sed -i "s/MONGO_INITDB_ROOT_USERNAME=.*/MONGO_INITDB_ROOT_USERNAME=$$db_user/" ./api-cours/env/db.env; \
		sed -i "s/MONGO_INITDB_ROOT_PASSWORD=.*/MONGO_INITDB_ROOT_PASSWORD=$$db_pass/" ./api-cours/env/db.env; \
		sed -i "s/MONGO_INITDB_DATABASE=.*/MONGO_INITDB_DATABASE=cours/" ./api-cours/env/db.env; \
		sed -i "s/ME_CONFIG_MONGODB_AUTH_USERNAME=.*/ME_CONFIG_MONGODB_AUTH_USERNAME=$$db_user/" ./api-cours/env/mongoexpress.env; \
		sed -i "s/ME_CONFIG_MONGODB_AUTH_PASSWORD=.*/ME_CONFIG_MONGODB_AUTH_PASSWORD=$$db_pass/" ./api-cours/env/mongoexpress.env; \
		sed -i "s/username=.*/username=$$db_user/" ./api-cours/app/config/iniconf/cours.db.ini; \
		sed -i "s/password=.*/password=$$db_pass/" ./api-cours/app/config/iniconf/cours.db.ini; \
		echo "✓ Configuration mise à jour avec succès!"; \
	fi
endef

define utilisateur_setup
	@echo "\n[3/4] Configuration de l'API des utilisateurs"
	@echo "----------------------------------------"
	$(call copy_exemple,./api-utilisateur/app/config/iniconf/utilisateur.db.ini.exemple)
	$(call copy_exemple,./api-utilisateur/env/db.env.exemple)
	@read -p "Configurer les paramètres de la base de données? (y/N): " update_db; \
	if [ "$${update_db:-N}" = "y" ]; then \
		echo "\nConfiguration de la base de données:"; \
		read -p "Login administrateur (default: root): " db_user; \
		read -p "Mot de passe administrateur (default: root): " db_pass; \
		db_user=$${db_user:-root}; \
		db_pass=$${db_pass:-root}; \
		sed -i "s/POSTGRES_USER=.*/POSTGRES_USER=$$db_user/" ./api-utilisateur/env/db.env; \
		sed -i "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$$db_pass/" ./api-utilisateur/env/db.env; \
		sed -i "s/POSTGRES_DB=.*/POSTGRES_DB=utilisateur/" ./api-utilisateur/env/db.env; \
		sed -i "s/username=.*/username=$$db_user/" ./api-utilisateur/app/config/iniconf/utilisateur.db.ini; \
		sed -i "s/password=.*/password=$$db_pass/" ./api-utilisateur/app/config/iniconf/utilisateur.db.ini; \
		echo "✓ Configuration mise à jour avec succès!"; \
	fi
endef

define frontend_setup
	@echo "\n[4/4] Configuration du Frontend"
	@echo "----------------------------------------"
	$(call copy_exemple,./front-end/.env.exemple)
	@read -p "Configurer l'url de la gateway? (y/N): " update_api; \
	if [ "$${update_api:-N}" = "y" ]; then \
		echo "\nConfiguration URL:"; \
		read -p "URL Gateway (default: http://localhost:44311): " url; \
		url=$${url:-http://localhost:44311}; \
		sed -i "s|VITE_API_URL=.*|VITE_API_URL=$$url|" ./front-end/.env; \
		echo "✓ Url de la gateway mise à jour avec succès!"; \
	fi
endef

define gateway_setup
	@echo "\n[5/5] Configuration de la Gateway"
	@echo "----------------------------------------"
	$(call copy_exemple,./gateway/env/gateway.env.exemple)
	@read -p "Configurer les origines CORS? (y/N): " update_cors; \
	if [ "$${update_cors:-N}" = "y" ]; then \
		echo "\nOrigines CORS (les réseaux locaux sont automatiquement autorisés)"; \
		read -p "Domaines autorisés (séparés par des virgules): " cors_origins; \
		if [ -n "$$cors_origins" ]; then \
			sed -i "s|CORS_ALLOWED_ORIGINS=.*|CORS_ALLOWED_ORIGINS=$$cors_origins|" ./gateway/env/gateway.env; \
			echo "✓ Origines CORS mises à jour avec succès!"; \
		fi; \
	fi
endef

define docker_install
	@echo "\n[1/2] Arrêt des conteneurs Docker"
	@echo "----------------------------------------"
	@docker compose down

	@echo "\n[2/2] Nettoyage des dépendances existantes"
	@echo "----------------------------------------"
	@rm -rf ./api-auth/app/vendor
	@rm -rf ./api-cours/app/vendor
	@rm -rf ./api-utilisateur/app/vendor
	@rm -rf ./gateway/vendor
	@rm -rf ./front-end/node_modules
	@rm -rf ./api-execution/router/node_modules
	@rm -rf ./api-execution/worker/java/node_modules
	@rm -rf ./api-execution/worker/python/node_modules
	@echo "✓ Nettoyage terminé !"
endef

define vendor_install
	@echo "\n📦 Installation des dépendances PHP (vendors)"
	@echo "----------------------------------------"
	@docker compose up -d gateway.jeancademie && \
	docker compose exec gateway.jeancademie composer install && \
	echo "  ✅ gateway/vendor"
	@docker compose up -d api.cours.jeancademie && \
	docker compose exec api.cours.jeancademie composer install && \
	echo "  ✅ api-cours/app/vendor"
	@docker compose up -d api.utilisateur.jeancademie && \
	docker compose exec api.utilisateur.jeancademie composer install && \
	echo "  ✅ api-utilisateur/app/vendor"
	@docker compose up -d api.auth.jeancademie && \
	docker compose exec api.auth.jeancademie composer install && \
	echo "  ✅ api-auth/app/vendor"
	@echo "✓ Tous les vendors installés !"
endef

define services_start
	@echo "\n🚀 Démarrage de tous les services"
	@echo "----------------------------------------"
	@docker compose up -d frontend.jeancademie
	@docker compose up -d api.execution
	@docker compose up -d java
	@docker compose up -d python
	@docker compose up -d --build
	@echo "✓ Tous les services sont en cours d'exécution."
endef


.PHONY: install update dev prod down status vendor check

# Fichier pour tracker le mode actif
MODE_FILE := .current_mode

# Fichiers requis pour le fonctionnement
REQUIRED_FILES := \
	./api-auth/env/auth.env \
	./api-auth/env/db.env \
	./api-auth/app/config/iniconf/auth.db.ini \
	./api-cours/env/db.env \
	./api-cours/app/config/iniconf/cours.db.ini \
	./api-utilisateur/env/db.env \
	./api-utilisateur/app/config/iniconf/utilisateur.db.ini \
	./front-end/.env \
	./gateway/env/gateway.env

REQUIRED_VENDORS := \
	./gateway/vendor \
	./api-auth/app/vendor \
	./api-cours/app/vendor \
	./api-utilisateur/app/vendor

# Fonction pour vérifier si l'installation est complète
define check_install
	@missing_files=""; \
	missing_vendors=""; \
	for file in $(REQUIRED_FILES); do \
		if [ ! -f "$$file" ]; then \
			missing_files="$$missing_files\n  ❌ $$file"; \
		fi; \
	done; \
	for vendor in $(REQUIRED_VENDORS); do \
		if [ ! -d "$$vendor" ]; then \
			missing_vendors="$$missing_vendors\n  ❌ $$vendor"; \
		fi; \
	done; \
	if [ -n "$$missing_files" ] || [ -n "$$missing_vendors" ]; then \
		echo "⚠️  Installation incomplète détectée"; \
		if [ -n "$$missing_files" ]; then \
			echo "\nFichiers de configuration manquants:$$missing_files"; \
		fi; \
		if [ -n "$$missing_vendors" ]; then \
			echo "\nDépendances manquantes:$$missing_vendors"; \
		fi; \
		echo ""; \
		read -p "Voulez-vous lancer l'installation complète? (y/N): " do_install; \
		if [ "$${do_install:-N}" = "y" ]; then \
			$(MAKE) install; \
			exit 0; \
		else \
			echo "\n⚠️  Vous avez choisi de ne pas installer."; \
			if [ -n "$$missing_files" ]; then \
				echo "❌ Impossible de continuer sans les fichiers de configuration."; \
				echo "   Créez-les manuellement ou lancez 'make install'."; \
				exit 1; \
			fi; \
			if [ -n "$$missing_vendors" ]; then \
				echo "⚠️  Les vendors sont manquants. Les services peuvent ne pas fonctionner."; \
				read -p "Continuer quand même? (y/N): " force_continue; \
				if [ "$${force_continue:-N}" != "y" ]; then \
					echo "Abandon."; \
					exit 1; \
				fi; \
			fi; \
		fi; \
	fi
endef

# Fonction pour obtenir le mode actif
get_mode = $(shell cat $(MODE_FILE) 2>/dev/null || echo "none")

dev:
	$(call check_install)
	@current_mode=$$(cat $(MODE_FILE) 2>/dev/null || echo "none"); \
	if [ "$$current_mode" = "dev" ]; then \
		echo "🔽 Mode DEV actif, arrêt en cours..."; \
		docker compose down; \
		rm -f $(MODE_FILE); \
		echo "✓ Environnement DEV arrêté"; \
	elif [ "$$current_mode" = "prod" ]; then \
		echo "🔄 Switch PROD → DEV"; \
		docker compose -f docker-compose.prod.yaml down; \
		docker compose up -d; \
		echo "dev" > $(MODE_FILE); \
		echo "✓ Environnement DEV démarré"; \
	else \
		echo "🚀 Démarrage en mode DEV..."; \
		docker compose up -d; \
		echo "dev" > $(MODE_FILE); \
		echo "✓ Environnement DEV démarré"; \
	fi

prod:
	$(call check_install)
	@current_mode=$$(cat $(MODE_FILE) 2>/dev/null || echo "none"); \
	if [ "$$current_mode" = "prod" ]; then \
		echo "🔽 Mode PROD actif, arrêt en cours..."; \
		docker compose -f docker-compose.prod.yaml down; \
		rm -f $(MODE_FILE); \
		echo "✓ Environnement PROD arrêté"; \
	elif [ "$$current_mode" = "dev" ]; then \
		echo "🔄 Switch DEV → PROD"; \
		docker compose down; \
		docker compose -f docker-compose.prod.yaml up -d; \
		echo "prod" > $(MODE_FILE); \
		echo "✓ Environnement PROD démarré"; \
	else \
		echo "🚀 Démarrage en mode PROD..."; \
		docker compose -f docker-compose.prod.yaml up -d; \
		echo "prod" > $(MODE_FILE); \
		echo "✓ Environnement PROD démarré"; \
	fi

down:
	@current_mode=$$(cat $(MODE_FILE) 2>/dev/null || echo "none"); \
	if [ "$$current_mode" = "dev" ]; then \
		docker compose down; \
	elif [ "$$current_mode" = "prod" ]; then \
		docker compose -f docker-compose.prod.yaml down; \
	else \
		docker compose down 2>/dev/null; \
		docker compose -f docker-compose.prod.yaml down 2>/dev/null; \
	fi; \
	rm -f $(MODE_FILE); \
	echo "✓ Tous les services arrêtés"

status:
	@current_mode=$$(cat $(MODE_FILE) 2>/dev/null || echo "none"); \
	if [ "$$current_mode" = "none" ]; then \
		echo "⚪ Aucun environnement actif"; \
	else \
		echo "🟢 Mode actif: $$current_mode"; \
		if [ "$$current_mode" = "dev" ]; then \
			docker compose ps; \
		else \
			docker compose -f docker-compose.prod.yaml ps; \
		fi \
	fi

check:
	@echo "🔍 Vérification de l'installation..."
	@all_ok=true; \
	echo "\n📁 Fichiers de configuration:"; \
	for file in $(REQUIRED_FILES); do \
		if [ -f "$$file" ]; then \
			echo "  ✅ $$file"; \
		else \
			echo "  ❌ $$file"; \
			all_ok=false; \
		fi; \
	done; \
	echo "\n📦 Dépendances (vendors):"; \
	for vendor in $(REQUIRED_VENDORS); do \
		if [ -d "$$vendor" ]; then \
			echo "  ✅ $$vendor"; \
		else \
			echo "  ❌ $$vendor"; \
			all_ok=false; \
		fi; \
	done; \
	echo ""; \
	if [ "$$all_ok" = true ]; then \
		echo "✅ Installation complète !"; \
	else \
		echo "⚠️  Installation incomplète. Lancez 'make install' pour corriger."; \
	fi

install:
	@echo "==============================================================================="
	@echo "                  JeanCademie - Setup initial                                  "
	@echo "==============================================================================="
	@echo "\nStarting configuration setup..."
	$(call auth_setup)
	$(call cours_setup)
	$(call utilisateur_setup)
	$(call frontend_setup)
	$(call gateway_setup)
	@echo "\nStarting Docker installation..."
	$(call docker_install)
	$(call vendor_install)
	$(call services_start)
	@echo "\n✓ Installation terminée !"

vendor:
	@echo "==============================================================================="
	@echo "                  JeanCademie - Installation des vendors                       "
	@echo "==============================================================================="
	$(call vendor_install)

update:
	@echo "==============================================================================="
	@echo "                     JeanCademie - Mise à jour de la configuration             "
	@echo "==============================================================================="
	$(call auth_setup)
	$(call cours_setup)
	$(call utilisateur_setup)
	$(call frontend_setup)
	$(call gateway_setup)
	@echo "\n✓ Mise à jour de la configuration terminée!"
	@echo "==============================================================================="

reset:
	@echo "==============================================================================="
	@echo "                     JeanCademie - Réinitialisation de la configuration        "
	@echo "==============================================================================="
	@docker compose down -v
	@rm -rf ./api-auth/app/vendor
	@rm -rf ./api-cours/app/vendor
	@rm -rf ./api-utilisateur/app/vendor
	@rm -rf ./gateway/vendor
	@rm -rf ./front-end/node_modules
	@rm -rf ./api-execution/router/node_modules
	@rm -rf ./api-execution/worker/java/node_modules
	@rm -rf ./api-execution/worker/python/node_modules
	@rm -f ./api-auth/app/config/iniconf/auth.db.ini
	@rm -f ./api-auth/env/auth.env
	@rm -f ./api-auth/env/db.env
	@rm -f ./api-cours/app/config/iniconf/cours.db.ini
	@rm -f ./api-cours/env/db.env
	@rm -f ./api-cours/env/mongoexpress.env
	@rm -f ./api-utilisateur/app/config/iniconf/utilisateur.db.ini
	@rm -f ./api-utilisateur/env/db.env
	@rm -f ./front-end/.env
	@rm -f ./gateway/env/gateway.env
	@echo "\n✓ Réinitialisation terminée !"
	@echo "==============================================================================="
	@echo "Tous les services sont arrêtés et les dépendances ont été supprimées."
	@echo "Les fichiers de configuration (.env et .ini) ont également été supprimés."
	@echo "Vous pouvez maintenant exécuter 'make install' pour réinstaller les dépendances."
	@echo "==============================================================================="