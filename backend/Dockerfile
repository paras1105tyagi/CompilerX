# Use Alpine-based Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install g++ (and make, if needed)
RUN apk update && apk add --no-cache g++ 

# Copy local files to container
COPY . .


# Install Node.js dependencies
RUN npm install

# Expose backend port
EXPOSE 8000

# Start the Node.js app
CMD ["node", "index.js"]
