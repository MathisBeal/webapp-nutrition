#!/bin/sh

# Installer les dépendances
npm ci

# Préparer Nuxt.js
npx nuxt prepare

# Générer le client Prisma
npx prisma generate

# Exécuter la commande spécifiée dans CMD
exec "$@"
