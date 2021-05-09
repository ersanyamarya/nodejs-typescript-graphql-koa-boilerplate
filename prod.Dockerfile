# Building stage: 
FROM node:erbium-alpine as build

# Creating work directory
RUN mkdir /home/node/app
WORKDIR /home/node/app

# Installing dependencies
COPY package-lock.json package.json ./
RUN npm ci

# Copy all other files
COPY . .

# Building the production files
RUN npm run build


# Running the service:
FROM node:erbium-alpine

# Setting user 'node' and creating work directory
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

# Installing prod dependencies
COPY package-lock.json package.json ./
RUN npm ci --only=production

# Copying keys
COPY ./key ./key

# Getting the build files from 'build' stage
COPY --from=build --chown=node:node /home/node/app/build ./build

# Exposing port to the outside world
EXPOSE 3000

# add the entrypoint script
COPY ./docker-entrypoint.sh /home/node/app/docker-entrypoint.sh

# Copy env files
COPY .env.application .env

CMD ["node", "./build/index.js"]