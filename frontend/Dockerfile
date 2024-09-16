# Use Node.js as the base image
FROM node:20.6 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx for serving the built frontend
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY custom-nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i 's|/usr/share/nginx/html/index.html|/usr/share/nginx/html/index.html|g' /etc/nginx/conf.d/default.conf


# Expose the port for Nginx (80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
