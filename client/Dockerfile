#define node image to be used
FROM node:17-alpine
#define working directory
RUN mkdir -p /app
WORKDIR /app
#copy to container to be able to use npm commands
COPY package.json /app
COPY package-lock.json /app
COPY . /app
RUN npm install
CMD ["npm", "start"]