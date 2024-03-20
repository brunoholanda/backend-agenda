FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g @adonisjs/cli
RUN npm install @adonisjs/mail
COPY .envs/.env-dev .env
COPY . .
RUN adonis migration:run
RUN adonis seed
EXPOSE 3333
CMD ["adonis", "serve", "--dev"]

