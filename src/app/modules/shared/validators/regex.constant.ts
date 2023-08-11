/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: regex.constant.ts
 *   Created at: 2023-08-11, 00:19:21
 *   Last updated at: 2023-08-11, 20:55:25
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

interface IRegexValidators {
  USERNAME: RegExp;
  USERNAME_OR_EMAIL: RegExp;
  OTA_TOKEN: RegExp;
  PASSWORD: RegExp;
}

export const regex: IRegexValidators = {
  USERNAME: /^[a-z\d_-]+$/,
  USERNAME_OR_EMAIL:
    /^(?![_.-])\b(?![.-])[\w.-]*(_\w*)?\b(@[a-z0-9]+([-_.][a-z0-9]+)*\.[a-z]{2,100})?$/,
  OTA_TOKEN: /^[a-zA-Z0-9]+$/,
  PASSWORD: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,80}$/,
};
