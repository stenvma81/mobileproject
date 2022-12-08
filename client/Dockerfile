# define node image to be used
FROM node:18-alpine
# define working directory
RUN mkdir -p /app
WORKDIR /app
# copy to container to be able to use npm commands
COPY package.json /app
COPY package-lock.json /app
COPY . /app
# run needed commands to install dependencies and start the client
RUN npm install
CMD ["npm", "start"]