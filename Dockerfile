# FROM node:alpine

# WORKDIR /usr/src/app

# COPY . /usr/src/app

# # Disable Angular telemetry
# ENV NG_CLI_ANALYTICS=false

# RUN npm install -g @angular/cli

# RUN npm install

# CMD ["ng", "serve", "--host", "0.0.0.0"]

# Stage 1: Build the Angular application
FROM node:alpine AS build
WORKDIR /usr/src/app

ENV NG_CLI_ANALYTICS=false

# Install Angular CLI globally (optional if only using local scripts)
RUN npm install -g @angular/cli

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Angular app in production mode
RUN ng build --configuration production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built files from Stage 1
COPY --from=build usr/src/app/dist/draft-tool /usr/share/nginx/html

# Copy a custom Nginx configuration file if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port Nginx runs on
EXPOSE 80

# Nginx will run automatically as the container entrypoint
