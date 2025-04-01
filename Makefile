define copy_exemple
	@if [ ! -f $(1:.exemple=) ]; then \
		cp $(1) $(1:.exemple=); \
		echo "Créé $(1:.exemple=) depuis $(1)"; \
	fi
endef

define auth_setup
	@echo "Api-auth"
	$(call copy_exemple,./api-auth/app/config/iniconf/auth.db.ini.exemple)
	$(call copy_exemple,./api-auth/env/auth.env.exemple)
	$(call copy_exemple,./api-auth/env/db.env.exemple)
	@read -p "Voulez-vous mettre à jour la configuration de la base de données? (y/N): " update_db; \
	if [ "$${update_db:-N}" = "y" ]; then \
		echo "\nConfiguration de la base de données"; \
		read -p "Entrez le nom de l'admin (default: root): " db_user; \
		read -p "Entrez le mot de passe de l'admin (default: root): " db_pass; \
		db_user=$${db_user:-root}; \
		db_pass=$${db_pass:-root}; \
		sed -i "s/POSTGRES_USER=.*/POSTGRES_USER=$$db_user/" ./api-auth/env/db.env; \
		sed -i "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$$db_pass/" ./api-auth/env/db.env; \
		sed -i "s/username=.*/username=$$db_user/" ./api-auth/app/config/iniconf/auth.db.ini; \
		sed -i "s/password=.*/password=$$db_pass/" ./api-auth/app/config/iniconf/auth.db.ini; \
		echo "\nConfiguration de la base de données mise à jour avec succès !"; \
	fi; \
	read -p "Voulez-vous générer une nouvelle clé JWT? (y/N): " update_jwt; \
	if [ "$${update_jwt:-N}" = "y" ]; then \
		jwt_key=$$(openssl rand -hex 32); \
		sed -i "s/JWT_SECRET_KEY = .*/JWT_SECRET_KEY = '$$jwt_key'/" ./api-auth/env/auth.env; \
		echo "Clé JWT créée avec succès!"; \
	fi
	@echo "----------------------------------------\n"
endef

define cours_setup
	@echo "Api-cours"
	$(call copy_exemple,./api-cours/app/config/iniconf/cours.db.ini.exemple)
	$(call copy_exemple,./api-cours/env/db.env.exemple)
	$(call copy_exemple,./api-cours/env/mongoexpress.env.exemple)
	@read -p "Voulez-vous mettre à jour la configuration de la base de données? (y/N): " update_db; \
	if [ "$${update_db:-N}" = "y" ]; then \
		echo "\nConfiguration de la base de données"; \
		read -p "Entrez le nom de l'admin (default: root): " db_user; \
		read -p "Entrez le mot de passe de l'admin (default: root): " db_pass; \
		db_user=$${db_user:-root}; \
		db_pass=$${db_pass:-root}; \
		sed -i "s/MONGO_INITDB_ROOT_USERNAME=.*/MONGO_INITDB_ROOT_USERNAME=$$db_user/" ./api-cours/env/db.env; \
		sed -i "s/MONGO_INITDB_ROOT_PASSWORD=.*/MONGO_INITDB_ROOT_PASSWORD=$$db_pass/" ./api-cours/env/db.env; \
		sed -i "s/ME_CONFIG_MONGODB_AUTH_USERNAME=.*/ME_CONFIG_MONGODB_AUTH_USERNAME=$$db_user/" ./api-cours/env/mongoexpress.env; \
		sed -i "s/ME_CONFIG_MONGODB_AUTH_PASSWORD=.*/ME_CONFIG_MONGODB_AUTH_PASSWORD=$$db_pass/" ./api-cours/env/mongoexpress.env; \
		sed -i "s/username=.*/username=$$db_user/" ./api-cours/app/config/iniconf/cours.db.ini; \
		sed -i "s/password=.*/password=$$db_pass/" ./api-cours/app/config/iniconf/cours.db.ini; \
		echo "\nConfiguration de la base de données mise à jour avec succès !"; \
	fi
	@echo "----------------------------------------\n"
endef

define utilisateur_setup
	@echo "Api-utilisateur"
	$(call copy_exemple,./api-utilisateur/app/config/iniconf/utilisateur.db.ini.exemple)
	$(call copy_exemple,./api-utilisateur/env/db.env.exemple)
	@read -p "Voulez-vous mettre à jour la configuration de la base de données? (y/N): " update_db; \
	if [ "$${update_db:-N}" = "y" ]; then \
		echo "\nConfiguration de la base de données"; \
		read -p "Entrez le nom de l'admin (default: root): " db_user; \
		read -p "Entrez le mot de passe de l'admin (default: root): " db_pass; \
		db_user=$${db_user:-root}; \
		db_pass=$${db_pass:-root}; \
		sed -i "s/POSTGRES_USER=.*/POSTGRES_USER=$$db_user/" ./api-utilisateur/env/db.env; \
		sed -i "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$$db_pass/" ./api-utilisateur/env/db.env; \
		sed -i "s/username=.*/username=$$db_user/" ./api-utilisateur/app/config/iniconf/utilisateur.db.ini; \
		sed -i "s/password=.*/password=$$db_pass/" ./api-utilisateur/app/config/iniconf/utilisateur.db.ini; \
		echo "\nConfiguration de la base de données mise à jour avec succès !"; \
	fi
	@echo "----------------------------------------\n"
endef

define frontend_setup
	@echo "Frontend"
	$(call copy_exemple,./front-end/.env.exemple)
	@read -p "Voulez-vous mettre à jour la configuration du Frontend? (y/N): " update_api; \
	if [ "$${update_api:-N}" = "y" ]; then \
		echo "\nConfiguration de l'API"; \
		read -p "Entrez l'URL de la Gateway (default: http://localhost:44311): " url; \
		url=$${url:-http://localhost:44311}; \
		sed -i "s|VITE_API_URL=.*|VITE_API_URL=$$url|" ./front-end/.env; \
		echo "\nConfiguration de l'API mise à jour avec succès !"; \
	fi
	@echo "----------------------------------------\n"
endef

define docker_install
	@echo "Arrêt de tous les conteneurs Docker"
	@echo "----------------------------------------"
	@docker compose down

	@echo "Nettoyage des dépendances existantes"
	@echo "----------------------------------------"
	@rm -rf ./api-auth/app/vendor
	@rm -rf ./api-cours/app/vendor
	@rm -rf ./api-utilisateur/app/vendor
	@rm -rf ./gateway/vendor
	@rm -rf ./front-end/node_modules
	@rm -rf ./api-execution/router/node_modules
	@rm -rf ./api-execution/worker/java/node_modules
	@rm -rf ./api-execution/worker/python/node_modules
	
	@echo "Installation des dépendances via Docker"
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

	@echo "Démarrage de tous les services"
	@echo "----------------------------------------"
	@docker compose up -d --build

	@echo "Installation des dépendances terminée et Docker lancé"
	@echo "----------------------------------------"
endef

install:
	@echo "Configuration des fichiers de configuration"
	@echo "----------------------------------------\n"
	$(call auth_setup)
	$(call cours_setup)
	$(call utilisateur_setup)
	$(call frontend_setup)
	@echo "Configuration des fichiers de configuration terminée"
	@echo "----------------------------------------\n"
	$(call docker_install)

update:
	@echo "Mise à jour des fichiers de configuration"
	@echo "----------------------------------------\n"
	$(call auth_setup)
	$(call cours_setup)
	$(call utilisateur_setup)
	$(call frontend_setup)
	@echo "Mise à jour des configurations terminée"
	@echo "----------------------------------------"