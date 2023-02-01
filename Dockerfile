FROM node:lts-alpine3.16

WORKDIR /app

COPY . .

CMD ["npm", "install"]