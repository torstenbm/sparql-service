FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
ENV SERVER_PORT 3020
EXPOSE 3020
CMD [ "yarn", "start" ]
