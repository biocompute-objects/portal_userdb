FROM nginx:alpine

WORKDIR /portal_userdb_client

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY build/ /portal_userdb_client/build

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]