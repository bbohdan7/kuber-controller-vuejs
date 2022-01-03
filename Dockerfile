FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
ADD package.json /usr/src/app/package.json
RUN npm install

COPY . .
EXPOSE 8080

CMD ["npm", "run", "serve"]
