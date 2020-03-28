FROM node:10.18.0-alpine3.11
WORKDIR /tweetku
COPY . /tweetku
RUN npm install --production
EXPOSE 8080
CMD npm run start-docker