FROM node:18.16.0-alpine AS build

ARG BUILD_MODE

WORKDIR /moonsphere

COPY moonsphere-base moonsphere-base/
COPY moonsphere-web-client moonsphere-web-client/

WORKDIR /moonsphere/moonsphere-base

RUN yarn install

WORKDIR /moonsphere/moonsphere-web-client

RUN mkdir dist

RUN yarn install
RUN yarn run docker:$BUILD_MODE

WORKDIR /moonsphere

RUN rm -rf moonsphere-base

FROM nginx:latest AS run

LABEL maintainer="MoonSphere Systems <info@moonsphere.pl>"

COPY --from=build /moonsphere/moonsphere-web-client/dist /usr/share/nginx/html
COPY --from=build /moonsphere/moonsphere-web-client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
