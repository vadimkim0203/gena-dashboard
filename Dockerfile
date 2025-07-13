FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the port
EXPOSE 3000

# Start in development mode
CMD ["npm", "run", "dev"]