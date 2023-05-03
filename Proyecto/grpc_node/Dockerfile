#Esta imagen 

FROM node:12.22.9

WORKDIR /var/www

COPY package.json .

RUN npm install

COPY . .

#es lo mismo para el server y el cliente
#CMD ["node", "server.js"]
CMD ["node", "client.js"]