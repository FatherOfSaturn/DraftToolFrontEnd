FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

# Disable Angular telemetry
ENV NG_CLI_ANALYTICS=false

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]

# Dockerfile for Angular App
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Serve the Angular files using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/draft-tool /usr/share/nginx/html
EXPOSE 80

