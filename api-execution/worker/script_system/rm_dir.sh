#!/bin/bash

# Répertoire parent à surveiller
parent_directory="/tmp"
# Temps limite en secondes (10 minutes = 600 secondes)
timeout=$((10 * 60))

# Obtenir l'heure actuelle en secondes depuis l'époque Unix
current_time=$(date +%s)

# Parcourir tous les sous-répertoires du répertoire parent
for directory in "$parent_directory"/*; do
    # Vérifier si c'est un répertoire
    if [ -d "$directory" ]; then
        # Obtenir l'heure du dernier accès du répertoire
        last_access=$(stat --format='%X' "$directory")

        # Calculer la différence de temps entre l'accès et l'heure actuelle
        time_diff=$((current_time - last_access))

        # Si le répertoire n'a pas été utilisé depuis plus de $timeout secondes
        if [ $time_diff -gt $timeout ]; then
            echo "Le répertoire $directory n'a pas été utilisé depuis $time_diff secondes. Suppression..."
            rm -rf "$directory"
        else
            echo "Le répertoire $directory est toujours actif."
        fi
    fi
done