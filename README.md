# webapp-nutrition

Projet de WebApp pour la nutrition

## Pour Git

GUI pour git : SourceGit => https://sourcegit-scm.github.io/

Surtout pour le GitFlow (celui de base)

## Architecture des fichiers Nuxt.js

**`assets/`**

- Contient des fichiers non transformés par Webpack (images, styles SCSS, etc.).
- Accessible uniquement via les importations dans le code.

**`components/`**

- Contient les composants Vue réutilisables (boutons, en-têtes, etc.).
- Utilisable directement sans besoin d'importation explicite grâce à l'auto-import.

**`composables/`**

- Stocke les fonctions réutilisables (_composables_), comme les hooks dans Vue 3.
- Utilisé pour la logique partagée entre composants.

**`content/`**

- Contient des fichiers Markdown ou JSON pour gérer le contenu si le module `@nuxt/content` est utilisé.
- Permet de construire des sites orientés contenu.

**`layouts/`**

- Définit des modèles de mise en page (header/footer fixes, etc.).
- Chaque mise en page peut être appliquée à différentes pages.

**`middleware/`**

- Contient des fichiers pour exécuter des fonctions avant le rendu des pages.
- Utile pour des vérifications comme l'authentification.

**`pages/`**

- Contient les composants Vue qui définissent les pages.
- Chaque fichier représente une route grâce au système de génération automatique des routes.

**`plugins/`**

- Stocke des fichiers pour initialiser des bibliothèques ou extensions (comme Vue plugins).
- Exécuté avant la montée de l'application.

**`public/`**

- Contient des fichiers statiques accessibles directement via l’URL (ex : `/images/logo.png`).
- Aucun traitement par Webpack.

**`server/`**

- Contient les fichiers pour créer une API côté serveur avec Nuxt 3.
- Permet de définir des routes d'API et de la logique serveur.

**`test/`**

- Contient les fichiers de tests

**`app.vue`**

- Point d'entrée principal de l'application, comme le layout racine.

**`nuxt.config.ts`**

- Fichier de configuration principal pour personnaliser le comportement de l'application.

**`package.json`**

- Déclare les dépendances du projet et les scripts NPM.

**`.nuxt/`**

- Dossier généré par Nuxt contenant les fichiers de build et de développement.
- Ne pas modifier directement.

## Explication des scripts npm

Voici une description rapide de chaque script npm :

- **`check-type`** :
  Vérifie les types avec TypeScript sans générer de fichiers (`tsc --noEmit`).

- **`build`** :
  Compile l'application pour la production en générant les fichiers dans le dossier `.output` (`nuxi build`).

- **`clean`** :
  Supprime le dossier `.output` pour nettoyer les fichiers générés (`rimraf .output`).

- **`dev`** :
  Lance le serveur de développement pour travailler sur l'application (`nuxt dev`).

- **`test`** :
  Exécute les tests définis avec Vitest une seule fois (`vitest run`).

- **`test:watch`** :
  Lance les tests avec Vitest en mode "watch" pour une exécution continue lors de modifications (`vitest`).

- **`generate`** :
  Génère un site statique basé sur l'application Nuxt (`nuxt generate`).

- **`preview`** :
  Lance un serveur local pour prévisualiser l'application générée en production (`nuxt preview`).

- **`lint:dev`** :
  Analyse le code pour détecter les erreurs ou problèmes de style avec ESLint (`eslint`).

- **`lint:fix`** :
  Corrige automatiquement les erreurs ou problèmes détectés par ESLint (`eslint --fix`).

- **`lint:build`** :
  Exécute ESLint sans tolérer d'avertissements (`npm run lint:dev --max-warnings=0`).

- **`format`** :
  Formate automatiquement le code avec `pretty-quick` sans restager les fichiers (`pretty-quick --no-restage`).

- **`format-check`** :
  Vérifie si le code est bien formaté sans le modifier (`pretty-quick --check`).

- **`postinstall`** :
  Prépare les fichiers nécessaires après l'installation des dépendances Nuxt (`nuxt prepare`).

## 📂 **Alias et leurs chemins correspondants**

| Alias      | Chemin réel (par rapport au dossier du projet) | Description                                                                           |
| ---------- | ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| `~`        | `./`                                           | Racine du projet.                                                                     |
| `~/*`      | `./*`                                          | Tous les sous-dossiers et fichiers à partir de la racine du projet.                   |
| `@`        | `./`                                           | Racine du projet (alternative à `~`).                                                 |
| `@/*`      | `./*`                                          | Tous les sous-dossiers et fichiers à partir de la racine (alternative à `~`).         |
| `~~`       | `./`                                           | Racine du projet (équivalent à `~` et `@`).                                           |
| `~~/*`     | `./*`                                          | Tous les sous-dossiers et fichiers à partir de la racine (équivalent à `~/*`).        |
| `@@`       | `./`                                           | Racine du projet (équivalent à `~`, `@`, et `~~`).                                    |
| `@@/*`     | `./*`                                          | Tous les sous-dossiers et fichiers à partir de la racine (équivalent à `@/*`).        |
| `#shared`  | `./shared`                                     | Répertoire `shared` à la racine du projet, souvent utilisé pour des modules partagés. |
| `assets`   | `./assets`                                     | Répertoire `assets` contenant les fichiers statiques (images, styles, etc.).          |
| `public`   | `./public`                                     | Répertoire `public` exposé publiquement lors du build.                                |
| `public/*` | `./public/*`                                   | Tous les sous-dossiers et fichiers dans `public`.                                     |

Pour ajouter de nouveaux alias ou modifier ceux existants, éditez le fichier `.nuxt/tsconfig.json` en respectant la structure actuelle.

## Connexion à la base de données

Pour se connecter à la base de données, vous devez créer un fichier `.env` à la racine du projet avec les paramètres de connexion appropriés. Voici un exemple de fichier `.env` :

```properties
DATABASE_URL="mysql://root:root@localhost:3306/nutrition_webapp"
```

## Utilisation de Docker Compose

Pour gérer votre projet avec Docker Compose, utilisez le fichier `docker-dev-compose.yaml` pour la version de développement. Voici les commandes principales et leur utilité :

### Build

```sh
docker-compose -f docker-dev-compose.yaml build
```

Cette commande construit les images Docker définies dans le fichier `docker-dev-compose.yaml`. Utilisez-la lorsque vous modifiez le `Dockerfile` ou les dépendances de votre projet.

### Up

```sh
docker-compose -f docker-dev-compose.yaml up
```

Lance les conteneurs définis dans le fichier `docker-dev-compose.yaml`. Utilisez cette commande pour démarrer l'application et ses services associés.

### Down

```sh
docker-compose -f docker-dev-compose.yaml down
```

Arrête et supprime les conteneurs, réseaux et volumes créés par `docker-compose up`. Utilisez cette commande si vous devez réinitialiser l'état des conteneurs, par exemple, après avoir modifié le dump de la base de données. Pensez également à supprimer le dossier `docker/db/volume` pour une réinitialisation complète.

### Start

```sh
docker-compose -f docker-dev-compose.yaml start
```

Démarre les conteneurs existants sans les recréer. Utilisez cette commande pour redémarrer rapidement les services après un arrêt.

### Stop

```sh
docker-compose -f docker-dev-compose.yaml stop
```

Arrête les conteneurs sans les supprimer. Utilisez cette commande pour arrêter temporairement les services sans perdre leur état.

### Exemple de workflow

1. **Modification du Dockerfile** :

```sh
docker-compose -f docker-dev-compose.yaml build
docker-compose -f docker-dev-compose.yaml up
```

2. **Changement du dump de la base de données** :

```sh
docker-compose -f docker-dev-compose.yaml down
rm -rf docker/db/volume
docker-compose -f docker-dev-compose.yaml up
```

3. **Démarrage rapide des services** :

```sh
docker-compose -f docker-dev-compose.yaml start
```

4. **Arrêt temporaire des services** :

```sh
docker-compose -f docker-dev-compose.yaml stop
```

## Point sur la base de données avec Docker Compose

Quand le containeur importe la base de données il peut être très long (15min). Pour s'assurer que la base de données est prête, regardez les logs du container MySql.

1. **Début de l'importation** :

```sh
[Note] [Entrypoint]: /usr/local/bin/docker-entrypoint.sh: running /docker-entrypoint-initdb.d/dump.sql
```

2. **Confirmation du statut "prêt"** :

```sh
0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '9.1.0'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
```
