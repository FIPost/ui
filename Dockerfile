# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app

ARG VUE_APP_APIGATEWAY="http://localhost:8123"
ENV VUE_APP_API_GATEWAY ${VUE_APP_APIGATEWAY}

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]