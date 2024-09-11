FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm instal --silent
COPY . .
EXPOSE 3333
