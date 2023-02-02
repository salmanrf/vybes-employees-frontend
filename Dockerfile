FROM node:alpine

WORKDIR /home/node/app
RUN chown -R node:node /home/node/app

COPY --chown=node:node package.json .

RUN npm install
RUN npm install -D react-scripts

COPY --chown=node:node . .

# At the end, set the user to use when running this image
USER node

CMD npm run start