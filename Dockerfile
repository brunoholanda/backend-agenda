#docker build --no-cache -f Dockerfile.base.npm -t base-backend-agenda.npm:latest .
FROM base-backend-agenda.npm:latest as build
WORKDIR /usr/src/app
COPY package*.json ./
COPY .envs/.env-dev .env
COPY . .
RUN adonis migration:run
RUN adonis seed
EXPOSE 3333
#CMD ["adonis", "serve", "--dev"]

