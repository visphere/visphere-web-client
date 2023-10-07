FROM node:18.16.0-alpine AS build

ARG BUILD_MODE

WORKDIR /visphere

COPY visphere-base visphere-base/
COPY visphere-web-client visphere-web-client/

WORKDIR /visphere/visphere-base

RUN yarn install

WORKDIR /visphere/visphere-web-client

RUN mkdir dist

RUN yarn install
RUN yarn run docker:$BUILD_MODE

WORKDIR /visphere

RUN rm -rf visphere-base

FROM nginx:latest AS run

LABEL maintainer="Visphere <info@visphere.pl>"

COPY --from=build /visphere/visphere-web-client/dist /usr/share/nginx/html
COPY --from=build /visphere/visphere-web-client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
