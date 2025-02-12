#!/bin/bash

# Vérifie si `cron` est installé
if ! command -v crontab &> /dev/null; then
  echo "crontab n'est pas installé. Installation en cours..."

  # Installe `cron` selon la distribution
  if [ -f /etc/debian_version ]; then
    apt update
    apt install -y cron
  elif [ -f /etc/redhat-release ]; then
    yum install -y cronie
  elif [ -f /etc/arch-release ]; then
    pacman -S --noconfirm cronie
  else
    echo "Distribution non supportée. Installez cron manuellement."
    exit 1
  fi

  echo "cron installé avec succès."
else
  echo "crontab est déjà installé."
fi

# Chemin vers le script à exécuter
SCRIPT_PATH="/usr/src/worker/script_system/rm_dir.sh"

# Vérifie si le script existe
if [ ! -f "$SCRIPT_PATH" ]; then
  echo "Le script $SCRIPT_PATH n'existe pas. Veuillez vérifier le chemin."
  exit 1
fi

# Ajoute une tâche planifiée dans le crontab actuel
CRON_JOB="*/15 * * * * $SCRIPT_PATH"

# Vérifie si la tâche existe déjà
(crontab -l 2>/dev/null | grep -F "$CRON_JOB") && {
  echo "La tâche est déjà planifiée dans crontab."
} || {
  # Ajoute la tâche si elle n'existe pas
  (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
  echo "La tâche a été ajoutée : $CRON_JOB"
}

# Active et démarre le service `cron`
echo "Activation et démarrage du service cron..."
service cron start

# Affiche les tâches planifiées
echo "Tâches planifiées :"
crontab -l
