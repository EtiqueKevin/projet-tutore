#!/bin/bash

repertoire=$1

if [ -d "$repertoire" ]; then
  filetest=$(find "$repertoire" -type f -name "*Test.java" -exec basename {} .java \;)

  javac -cp ./packageTest/junit-4.12.jar:./packageTest/hamcrest-core-1.3.jar "$repertoire"/*.java 2>&1
  compile_status=$?

  if [ $compile_status -ne 0 ]; then
    echo "Erreur de compilation"
    exit 1
  fi

  if [ -n "${filetest}" ]; then
    java -cp ./packageTest/junit-4.12.jar:./packageTest/hamcrest-core-1.3.jar:"$repertoire" org.junit.runner.JUnitCore $filetest 2>&1
    test_status=$?
    exit $test_status
  else
    echo "Aucun fichier de test trouvé."
    exit 1
  fi
else
  echo "Le répertoire $repertoire n'existe pas."
  exit 1
fi