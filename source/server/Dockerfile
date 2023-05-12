FROM node:18.0.0-slim

RUN apt-get update || :
RUN apt-get install python3 g++ make  -y

RUN mkdir -p /var/server
WORKDIR /var/server

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV NODE_ENV production

ARG ADMIN_FIRST_NAME
ARG ADMIN_LAST_NAME
ARG ADMIN_EMAIL
ARG ADMIN_PASSWORD

RUN npm run strapi -- admin:create-user \
    --firstname=$ADMIN_FIRST_NAME \
    --lastname=$ADMIN_LAST_NAME \
    --email=$ADMIN_EMAIL \
    --password=$ADMIN_PASSWORD


RUN npm run build

CMD [ "npm", "start" ]