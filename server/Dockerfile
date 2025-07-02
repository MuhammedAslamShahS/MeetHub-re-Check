# server/Dockerfile
FROM node:20-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the server files
COPY . .

# Expose server port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
