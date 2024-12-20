#!/bin/bash

# Spécifie le répertoire à parcourir
repertoire=$1

# Vérifie si le répertoire existe
if [ -d "$repertoire" ]; then
  # Trouve le fichier de test (MainTest.java ou similaire)
  filetest=$(find "$repertoire" -type f -name "*Test.java" -exec basename {} .java \;)

  # Compile tous les fichiers Java dans le répertoire une seule fois
  javac -cp ./packageTest/junit-4.12.jar:./packageTest/hamcrest-core-1.3.jar "$repertoire"/*.java

  # Exécute les tests JUnit une seule fois pour le fichier de test trouvé
  if [ -n "$filetest" ]; then
    java -cp ./packageTest/junit-4.12.jar:./packageTest/hamcrest-core-1.3.jar:"$repertoire" org.junit.runner.JUnitCore "$filetest"
  else
    echo "Aucun fichier de test trouvé."
  fi
else
  echo "Le répertoire $repertoire n'existe pas."
fi
