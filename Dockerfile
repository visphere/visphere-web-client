FROM node:18.16.0-alpine AS build

ARG BUILD_MODE

WORKDIR /visphere

COPY visphere-base/tailwind visphere-base/tailwind/
COPY visphere-base/webpack visphere-base/webpack/
COPY visphere-base/s3-static visphere-base/s3-static/
COPY visphere-base/.env visphere-base/
COPY visphere-base/package.json visphere-base/
COPY visphere-base/yarn.lock visphere-base/

COPY visphere-web-client/.tsconfig visphere-web-client/.tsconfig/
COPY visphere-web-client/.webpack visphere-web-client/.webpack/
COPY visphere-web-client/src visphere-web-client/src/

COPY visphere-web-client/.babelrc visphere-web-client/
COPY visphere-web-client/karma.conf.cjs visphere-web-client/
COPY visphere-web-client/nginx.conf visphere-web-client/
COPY visphere-web-client/package.json visphere-web-client/
COPY visphere-web-client/tailwind.config.cjs visphere-web-client/
COPY visphere-web-client/tsconfig.json visphere-web-client/
COPY visphere-web-client/yarn.lock visphere-web-client/

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
