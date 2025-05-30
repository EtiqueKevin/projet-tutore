#!/bin/bash

# Spécifie le répertoire à parcourir
repertoire=$1


# Vérifie si le répertoire existe
if [ -d "$repertoire" ]; then

  filetest=$(find "$repertoire" -type f -name "*Test.py")
  echo "$filetest"

  if [ -n "$filetest" ]; then
     echo "$filetest"
     pytest "$filetest"
  else
    echo "Aucun fichier de test trouvé."
  fi
else
  echo "Le répertoire $repertoire n'existe pas."
fi
