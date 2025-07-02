# client/Dockerfile

FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files including index.html
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the built app
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
