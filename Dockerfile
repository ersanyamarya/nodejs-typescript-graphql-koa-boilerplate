FROM node:erbium-alpine

# Set environment variable
ENV APP_DIR "/home/node/app"
ENV CONTAINER_PORT "3000"

RUN mkdir -p ${APP_DIR}/node_modules && chown -R node:node ${APP_DIR}

WORKDIR ${APP_DIR}

COPY package-lock.json package.json ./
USER node
RUN npm ci

# Expose app port
EXPOSE ${CONTAINER_PORT}

COPY --chown=node:node . .

# add the entrypoint script
COPY ./docker-entrypoint.sh ${APP_DIR}/docker-entrypoint.sh

ENTRYPOINT ["/bin/sh", "/home/node/app/docker-entrypoint.sh"]