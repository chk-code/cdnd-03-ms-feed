# Build image
FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

# Set Port and run server
EXPOSE 8080
CMD [ "npm", "run", "prod" ]
