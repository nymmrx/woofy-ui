FROM node:12-alpine

WORKDIR /usr/src/app

EXPOSE 3000

RUN npm init -y
RUN yarn add serve-handler

# Environment variables in static service runtime are invalid,
# Environment variables have been generated directly during `build`
COPY ./out ./out
COPY ./server.js ./

CMD node server.js
