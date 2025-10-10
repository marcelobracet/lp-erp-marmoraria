FROM node:18-alpine AS builder
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install 
COPY . .
RUN yarn build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder package*.json ./
COPY --from=builder yarn.lock ./
RUN yarn install --production --frozen-lockfile && yarn cache clean
EXPOSE 3000
CMD ["yarn", "start"]