FROM node:16-alpine
WORKDIR /server_for_game
RUN npm install -g nodemon
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
CMD ["npm", "run", "dev"]