FROM node:12-alpine

RUN apk update && apk add bash

RUN mkdir /app
WORKDIR /app
COPY . /app

EXPOSE 1500

CMD ["node", "/app/server.js"]
