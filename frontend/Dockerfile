FROM node:20-alpine

# Installe nginx et openssl
RUN apk add --no-cache nginx openssl

# Crée les dossiers nécessaires
RUN mkdir -p /certs /usr/src/app

# Copie uniquement le frontend
WORKDIR /usr/src/app
COPY . .

# Installe et build le frontend
RUN npm install
RUN npm run build


# Copie les fichiers générés dans le dossier nginx
RUN mkdir -p /usr/share/nginx/html
RUN cp -r dist/* /usr/share/nginx/html/

# Copie la config nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Génére un certificat SSL
RUN openssl req -newkey rsa:4096 -x509 -sha256 -days 365 -nodes \
      -subj "/C=FR/ST=Paris/L=Paris/O=42/CN=62.210.34.175" \
      -out /certs/cert.crt \
      -keyout /certs/cert.key

EXPOSE 8443

CMD ["nginx", "-g", "daemon off;"]


# # Étape 1 : Utilise une image Node.js + Alpine
# FROM node:20-alpine

# # Étape 2 : Installe nginx + openssl
# RUN apk add --no-cache nginx openssl

# # Étape 3 : Définis le dossier de travail
# WORKDIR /usr/src/app/frontend

# # Étape 4 : Copie la conf nginx + le code source
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY . .

# # Étape 6 : Installe les dépendances et build le frontend
# RUN npm install 
# RUN npm run build

# # Étape 5 : Génère les certificats auto-signés directement ici
# RUN mkdir -p /certs && \
#     openssl req -newkey rsa:4096 -x509 -sha256 -days 365 -nodes \
#       -subj "/C=FR/ST=Paris/L=Paris/O=42/CN=62.210.34.175" \
#       -out /certs/cert.crt \
#       -keyout /certs/cert.key

# # Étape 7 : Expose le port utilisé par nginx
# EXPOSE 8443

# # Étape 8 : Démarre nginx
# CMD ["nginx", "-g", "daemon off;"]
