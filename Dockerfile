FROM node:12-alpine

WORKDIR /home/wsic

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]