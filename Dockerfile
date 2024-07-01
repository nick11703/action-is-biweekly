# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

FROM install AS build
COPY src src

# run the app
ENTRYPOINT [ "bun", "run", "/usr/src/app/src/index.ts" ]
