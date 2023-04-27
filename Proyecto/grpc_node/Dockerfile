#Esta imagen 

FROM node:alpine

WORKDIR /var/www

COPY package.json .

RUN npm install -g npm@9.6.5

COPY . .

#es lo mismo para el server y el cliente
#CMD ["node", "server.js"]
CMD ["node", "client.js"]