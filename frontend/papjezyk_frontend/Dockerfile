FROM node:alpine

WORKDIR papjezyk/pap_frontend

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start"]