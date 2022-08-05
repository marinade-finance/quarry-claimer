FROM node:14-alpine as builder

RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app
COPY . .

RUN yarn install --pure-lockfile --verbose
RUN yarn compile

FROM node:14-alpine

COPY --from=builder /usr/src/app /usr/src/app
WORKDIR /usr/src/app