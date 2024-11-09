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

# Set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html/browser && \
    chmod -R 755 /usr/share/nginx/html/browser

# Copy a custom Nginx configuration file if needed (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx runs on
EXPOSE 80
# Nginx will run automatically as the container entrypoint

# Install everything needed for Certbot
# Update and install Python3, pip, virtualenv, and other dependencies
RUN apk update && \
    apk add --no-cache python3 python3-dev py3-pip py3-virtualenv augeas-libs

# Create and activate a virtual environment for Certbot
RUN python3 -m venv /opt/certbot
ENV PATH="/opt/certbot/bin:$PATH"

# Upgrade pip within the virtual environment
RUN pip install --upgrade pip

# Install Certbot and the Certbot NGINX plugin within the virtual environment
RUN pip install certbot certbot-nginx

RUN certbot --nginx -d pyramiddraft.xyz --non-interactive --agree-tos --email hitma1221@gmail.com --redirect