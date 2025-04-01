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

define docker_install
	@echo "\n[1/4] Arrêt des conteneurs Docker"
	@echo "----------------------------------------"
	@docker compose down

	@echo "\n[2/4] Nettoyage des dépendances existantes"
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
	
	@echo "\n[3/4] Installation des dépendances via Docker"
	@echo "----------------------------------------"
	@docker compose up -d gateway.jeancademie && \
	docker compose exec gateway.jeancademie composer install && \
	docker compose up -d api.cours.jeancademie && \
	docker compose exec api.cours.jeancademie composer install && \
	docker compose up -d api.utilisateur.jeancademie && \
	docker compose exec api.utilisateur.jeancademie composer install && \
	docker compose up -d api.auth.jeancademie && \
	docker compose exec api.auth.jeancademie composer install && \
	docker compose up -d frontend.jeancademie && \
	docker compose up -d api.execution && \
	docker compose up -d java && \
	docker compose up -d python

	@echo "\n[4/4] Démarrage de tous les services"  
	@echo "----------------------------------------"
	@docker compose up -d --build

	@echo "\n✓ Installation terminée ! Tous les services sont en cours d'exécution."
	@echo "----------------------------------------"
endef


.PHONY: install update

install:
	@echo "==============================================================================="
	@echo "                  JeanCademie - Setup initial                                  "
	@echo "==============================================================================="
	@echo "\nStarting configuration setup..."
	$(call auth_setup)
	$(call cours_setup)
	$(call utilisateur_setup)
	$(call frontend_setup)
	@echo "\nStarting Docker installation..."
	$(call docker_install)

update:
	@echo "==============================================================================="
	@echo "                     JeanCademie - Mise à jour de la configuration             "
	@echo "==============================================================================="
	$(call auth_setup)
	$(call cours_setup)
	$(call utilisateur_setup)
	$(call frontend_setup)
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
	@echo "\n✓ Réinitialisation terminée !"
	@echo "==============================================================================="
	@echo "Tous les services sont arrêtés et les dépendances ont été supprimées."
	@echo "Les fichiers de configuration (.env et .ini) ont également été supprimés."
	@echo "Vous pouvez maintenant exécuter 'make install' pour réinstaller les dépendances."
	@echo "==============================================================================="