# Build stage
FROM node:20-alpine as build-stage

# Set working directory
WORKDIR /app

# Copy 
COPY . .

# Install dependencies
RUN npm install

# Build the app sin comprobación de tipos
RUN npm run build-only

# Production stage
FROM nginx:stable-alpine as production-stage

# Copy built files from build stage to nginx serve directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]