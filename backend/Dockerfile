FROM node:20-alpine

# Crée un répertoire de travail dans le conteneur
WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN echo "On vide le cache..."
RUN npm cache clean --force

RUN echo "Installation des dépendances..."
RUN npm install
RUN npm install fastify
RUN npm install @fastify/cors
RUN npm install -D typescript @types/node tsx



COPY . .

RUN npm run build

EXPOSE 8080

RUN echo "Lancement du Backend"
CMD ["node", "dist/server.js"]