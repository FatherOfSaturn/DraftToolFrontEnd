FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

# Disable Angular telemetry
ENV NG_CLI_ANALYTICS=false

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]