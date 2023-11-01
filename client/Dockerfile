FROM node:14 as build

WORKDIR /portal_userdb_client

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /portal_userdb_client/build /usr/share/nginx/html

EXPOSE 3000

CMD [ "nginx", "-g", "dsemon off;" ]