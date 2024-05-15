FROM node:lts-alpine3.19

RUN apk add busybox-extras

WORKDIR /app
COPY . .

EXPOSE 80 3000 8080

COPY docker/start-app /usr/local/bin/start-app
RUN chmod +x /usr/local/bin/start-app

ENTRYPOINT [ "start-app" ]