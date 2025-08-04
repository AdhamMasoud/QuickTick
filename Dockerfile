# Build React
FROM node:18 AS build-step

# Set working directory to /app/client
WORKDIR /app/client

# Copy package.json and package-lock.json from client folder
COPY client/package*.json ./

# Install dependencies
RUN npm install && \
    npm install --save \
    @fortawesome/fontawesome-svg-core \
    @fortawesome/free-solid-svg-icons \
    @fortawesome/react-fontawesome

# Copy the rest of client files
COPY client/ ./

# Run build inside /app/client
RUN CI=false npm run build

# Build Express
FROM node:18
WORKDIR /app
COPY server/package.json server/package-lock.json ./
COPY server/ ./

RUN npm install

RUN npm install -g node-gyp

RUN apt-get update && apt-get install -y build-essential python3

# Rebuild bcrypt using node-gyp
RUN npm rebuild bcrypt

# Fix the build path to point to the correct location
COPY --from=build-step /app/client/build ./client/build

# Make sure all server files are copied
RUN ls -la /app

EXPOSE 5000
CMD ["node", "index.js"]
