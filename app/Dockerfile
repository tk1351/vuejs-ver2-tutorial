FROM node:16.13.1 As development

WORKDIR /app

COPY ./app/package.json ./

RUN yarn install --only=development

COPY . .