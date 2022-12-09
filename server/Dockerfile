FROM node:18

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
# Run a command inside the container to start the server
CMD [ "node", "index.js" ]