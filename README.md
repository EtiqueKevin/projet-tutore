# Projet tutoré : Environnement d'apprentisage

Ceci est le répository github du projet tutoré environnement d'apprentisage. C'est un projet qui a pour but de réaliser une application web sur laquelle des étudiants peuvent commencer des cours et des exercices afin d'apprendre de nouveaux languages de programmation. Il y a aussi des professeurs qui peuvent créer les cours et les exercices.

## Sommaire

- [Membres du groupe](#membres-du-groupe)
- [Urls](#urls)
- [Différents composants du projet](#differents-composants-du-projet)

## Membres du groupe
- Brito Clément
- Bruson Paul
- Etique Kévin
- Nétange Clément
- Quilliec Amaury

## Urls
[Github](https://github.com/EtiqueKevin/projet-tutore) : Url du projet sur github

[CMS](https://grav.paul-bruson.fr/) : Url du CMS pour la gestion de l'avancement du projet

## Differents composants du projet

- [Front-end](front-end/README.md)
- [API utilisateur](api-utilisateur/README.md)
- [API gestion des cours](api-cours/README.md)
- [API d'éxecution de code](api-execution/README.md)

## Installation
### Prérequis
- [Docker](https://www.docker.com/)
- [Make](https://www.gnu.org/software/make/)

### Installation de l'environnement
1. Cloner le projet
```bash
git clone git@github.com:EtiqueKevin/projet-tutore.git
```
2. Se placer dans le dossier du projet
```bash
cd projet-tutore
```

3. Lancer le makefile avec droits administrateurs (nécéssaire pour supprimer les dépendances)
```bash
sudo make install
```
> [!NOTE]
> Répondre "y" lorsque le makefile vous le demande pour configurer les mots de passes des bases de données.


### Mise à jour des .env et .ini
1. Se placer dans le dossier du projet
```bash
cd projet-tutore
```
2. Lancer le makefile
```bash
make update
```
> [!NOTE]
> Répondre "y" lorsque le makefile vous le demande pour configurer les mots de passes des bases de données.

### Reset de l'environnement
1. Se placer dans le dossier du projet
```bash
cd projet-tutore
```
2. Lancer le makefile avec droits administrateurs (nécéssaire pour supprimer les dépendances)
```bash
sudo make reset
```

> [!NOTE]
> Cela supprimera aussi les volumes de docker, ce qui supprimera toutes les données de la base de données. Il est donc conseillé de faire un backup avant de faire cette opération.
