# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React application
RUN npm run build

# Expose the port on which the React application runs
EXPOSE 3000

# Start the JSON server and the React application
CMD npm run json-server & npm run dev
