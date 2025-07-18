# Based on
# https://dev.to/avatsaev/create-efficient-angular-docker-images-with-multi-stage-builds-1f3n

### STAGE 1: Build ###
FROM node:20.2.0-alpine3.16 as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . .

RUN npm run build


### STAGE 2: Setup ###
FROM nginx:1.29.0-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
