FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./ 

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app ./

COPY db.json /app/db.json

RUN npm install json-server --save-dev

EXPOSE 3000 3001

CMD npx json-server --watch /app/db.json --port 3001 & npm run start

