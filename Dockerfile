#
# Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
# Silesian University of Technology
#
#    File name: Dockerfile
#    Last modified: 6/24/23, 4:28 PM
#    Project name: moonsphere
#    Module name: moonsphere-web-client
#
# This project is a part of "MoonSphere" instant messenger system. This is a project completing a
# engineers degree in computer science at Silesian University of Technology.
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
# file except in compliance with the License. You may obtain a copy of the License at
#
#     <http://www.apache.org/license/LICENSE-2.0>
#
# Unless required by applicable law or agreed to in writing, software distributed under
# the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
# OF ANY KIND, either express or implied. See the License for the specific language
# governing permissions and limitations under the license.
#

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
