FROM node:16-alpine
WORKDIR /app
RUN npm install -g nodemon
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
CMD ["npm", "run", "dev"]