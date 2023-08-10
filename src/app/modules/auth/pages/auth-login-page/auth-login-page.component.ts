/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 * 
 *   File name: auth-login-page.component.ts
 *   Created at: 2023-08-06, 18:55:38
 *   Last updated at: 2023-08-11, 00:01:28
 * 
 *   Project name: moonsphere
 *   Module name: moonsphere-web-client
 * 
 * This project is a part of "MoonSphere" instant messenger system. This is a project
 * completing a engineers degree in computer science at Silesian University of Technology.
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

import { Component } from "@angular/core";
import { Oauth2Type } from "~/auth-mod/types/oauth2.type";
import { environment } from "~/env/environment";

@Component({
    selector: "msph-auth-login-page",
    templateUrl: "./auth-login-page.component.html",
    host: { class: "flex-grow flex flex-col" },
})
export class AuthLoginPageComponent {

    path = environment.contentDistributorBaseUrl;
    qrCode = "https://upload.wikimedia.org/wikipedia/commons/5/5e/QR_Code_example.png";

    oauth2Google = Oauth2Type.GOOGLE;
    oauth2Facebook = Oauth2Type.FACEBOOK;
    oauth2Twitter = Oauth2Type.TWITTER;
}
