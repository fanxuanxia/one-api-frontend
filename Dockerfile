FROM nginx

WORKDIR /app/web/
USER root

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist /app/web/

EXPOSE 80

CMD ["nginx", "-g", "daemon off"]