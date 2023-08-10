FROM node:18.16.0-alpine AS build

ARG BUILD_MODE

WORKDIR /moonsphere

COPY .env .
COPY _moonsphere-base _moonsphere-base/
COPY moonsphere-web-client moonsphere-web-client/

WORKDIR /moonsphere/moonsphere-web-client

RUN yarn install
RUN yarn run docker:$BUILD_MODE

WORKDIR /moonsphere

RUN rm -f .env
RUN rm -rf _moonsphere-base

FROM ubuntu:20.04

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y apache2
RUN rm -rf /var/lib/apt/lists/*

RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN chown root:root /var/www/html
RUN chmod 755 /var/www/html

RUN rm /var/www/html/index.html
COPY --from=build /moonsphere/moonsphere-web-client/dist/ /var/www/html

COPY moonsphere-web-client/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
