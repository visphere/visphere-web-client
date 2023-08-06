/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: _tailwind.config.js
 *    Last modified: 7/24/23, 2:36 AM
 *    Project name: moonsphere
 *    Module name: moonsphere-web-client
 *
 * This project is a part of "MoonSphere" instant messenger system. This is a project completing a
 * engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const envLocalPath = path.resolve(__dirname, "..", ".env.local");
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
}

module.exports = require(path.join(process.env.MOONSPHERE_BASE_PATH, "tailwind", "_tailwind.config.js"))({
    content: [
        "./src/**/*.{ejs,ts,html}",
    ],
    plugins: [
        require("tailwind-scrollbar-variants"),
        require("@tailwindcss/forms")({ strategy: "class" }),
    ],
});
