#------------------------------------
# Base image
#------------------------------------

FROM node:16.14.2-alpine AS base
RUN npm install -g pnpm@7.14
WORKDIR /usr/src/app

ARG ENV_FILE_PATH
ENV ENV_FILE_PATH $ENV_FILE_PATH
ADD $ENV_FILE_PATH /
RUN echo $ENV_FILE_PATH

RUN apk add --no-cache bash

#------------------------------------
# Build image
#------------------------------------
FROM base AS build
WORKDIR /usr/src/app

COPY . .

RUN pnpm install

EXPOSE $PORT

RUN export $(cat "/$ENV_FILE_PATH" | xargs) && pnpm run build

#------------------------------------
# Final image
#------------------------------------
FROM build AS prod
WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --production --ignore-scripts --prefer-offline

COPY --from=build --chown=appuser:appgroup /usr/src/app/dist dist
COPY --from=build --chown=appuser:appgroup /usr/src/app/start.sh start.sh

EXPOSE $PORT

ENTRYPOINT sh ./start.sh