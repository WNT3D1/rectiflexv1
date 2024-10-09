# Use an official lightweight Node.js image from Docker Hub
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json into the container
COPY package.json ./

# Install the app dependencies without relying on package-lock.json
RUN npm install

# Copy the rest of the app's code into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "run", "start"]
