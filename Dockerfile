# Step 1: Use Node.js image to build the app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the app
RUN npm run build

# Step 2: Use lightweight server to serve the built app
FROM nginx:alpine

# Copy build output to Nginx HTML folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
