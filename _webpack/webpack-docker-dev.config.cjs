/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: webpack-docker-dev.config.cjs
 *   Created at: 2023-08-11, 00:23:03
 *   Last updated at: 2023-08-11, 20:50:23
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

'use strict';

const webpackProdConfig = require('./webpack-prod.config.cjs');

module.exports = webpackProdConfig({
  landingPageBaseUrl: `http://localhost:${process.env.ENV_MSPH_LANDING_PAGE_PORT}`,
  clientBaseUrl: `http://localhost:${process.env.ENV_MSPH_WEB_CLIENT_PORT}`,
  cdnBaseUrl: `http://localhost:${process.env.ENV_MSPH_CONTENT_DISTRIBUTOR_PORT}`,
});
