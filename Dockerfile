# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
COPY package.json bun.lockb ./
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN bun install --frozen-lockfile --production

FROM install AS build
COPY src src

# run the app
USER bun
ENTRYPOINT [ "bun", "run", "src/index.ts" ]
