FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm instal --silent
COPY . .
EXPOSE 3333

CMD ["node", "index.js"]
