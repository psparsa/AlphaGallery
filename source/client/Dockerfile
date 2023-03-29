FROM node:19.8-alpine3.16

RUN mkdir -p /var/client
WORKDIR /var/client

COPY package.json package-lock.json ./
RUN npm ci

#COPY public \
#src \
#next.config.js \
#tailwind.config.js \
#tsconfig.json \
#postcss.config.js \
#.eslintrc.json \
#.eslintignore \
#./

COPY . .

ARG API_PROTOCOL
ENV NEXT_PUBLIC_API_PROTOCOL=$API_PROTOCOL

ARG API_HOSTNAME
ENV NEXT_PUBLIC_API_HOSTNAME=$API_HOSTNAME

ARG API_PORT
ENV NEXT_PUBLIC_API_PORT=$API_PORT

RUN ls -ltrh && echo "List of files"

RUN npm run build
EXPOSE 3000
RUN npm start