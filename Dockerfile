FROM nginx

WORKDIR /appDocker/web/
USER root

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /appDocker/web/

EXPOSE 80

CMD ["nginx", "-g", "daemon off"]

