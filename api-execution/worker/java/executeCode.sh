#!/bin/bash

repertoire=$1

if [ -d "$repertoire" ]; then

  filetest=$(find "$repertoire" -type f -name "*Test.java" -exec basename {} .java \;)

  javac -cp ./packageTest/junit-4.12.jar:./packageTest/hamcrest-core-1.3.jar "$repertoire"/*.java

  if [ -n "${filetest}" ]; then
    java -cp ./packageTest/junit-4.12.jar:./packageTest/hamcrest-core-1.3.jar:"$repertoire" org.junit.runner.JUnitCore $filetest
  else
    echo "Aucun fichier de test trouvé."
  fi

else
  echo "Le répertoire $repertoire n'existe pas."
fi
