FROM node:22

# Mettre à jour et installer les dépendances système
RUN apt-get update && apt-get install -y

WORKDIR /app

COPY package*.json ./

# Définir le script d'entrée
ENTRYPOINT ["/app/docker/entrypoint.sh"]

# Commande par défaut pour démarrer l'application
CMD ["npm", "run", "dev"]

# Commande pour maintenir le conteneur éveillé
CMD ["tail", "-f", "/dev/null"]
