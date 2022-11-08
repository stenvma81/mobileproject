#define node image to be used
FROM node:17-alpine as builder
#define working directory
WORKDIR /app
#copy to container to be able to use npm commands
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN  npm run build

#server-side image
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
#remove default static nginx resources
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]