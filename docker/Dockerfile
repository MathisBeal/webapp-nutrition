# Étape 1 : Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package*.json ./
RUN npm i

COPY . .
RUN npx prisma generate \
  && npm run build

# Étape 2 : Exécution
FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma/ ./prisma

CMD ["node", ".output/server/index.mjs"]
