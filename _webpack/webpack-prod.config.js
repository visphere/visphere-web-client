/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 * Silesian University of Technology
 *
 *    File name: webpack-spec.config.js
 *    Last modified: 7/23/23, 10:55 PM
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

const { merge } = require("webpack-merge");

const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { JavaScriptOptimizerPlugin } = require("@angular-devkit/build-angular/src/tools/webpack/plugins/javascript-optimizer-plugin");
const { TransferSizePlugin } = require("@angular-devkit/build-angular/src/tools/webpack/plugins/transfer-size-plugin");
const { CssOptimizerPlugin } = require("@angular-devkit/build-angular/src/tools/webpack/plugins/css-optimizer-plugin");

const { commonWebpackConfig } = require("./webpack-common.config.js");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = ({ landingPageBaseUrl, clientBaseUrl, cdnBaseUrl }) => merge(commonWebpackConfig({
    landingPageBaseUrl, clientBaseUrl, cdnBaseUrl, isProdMode: true
}), {
    mode: "production",
    stats: "normal",
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
        }),
    ],
    optimization: {
        runtimeChunk: "single",
        minimizer: [
            new CompressionPlugin({
                algorithm: "gzip",
                test: /\.(js|css)$/,
            }),
            new JavaScriptOptimizerPlugin({
                advanced: true,
                define: { ngDevMode: false, ngI18nClosureMode: false, ngJitMode: false },
                sourcemap: false,
                keepIdentifierNames: false,
                removeLicenses: true,
            }),
            new TransferSizePlugin(),
            new CssOptimizerPlugin(),
            new CssMinimizerWebpackPlugin({
                minimizerOptions: {
                    preset: [
                        "default", {
                            discardComments: {
                                removeAll: true,
                            },
                        },
                    ],
                },
            }),
            new TerserWebpackPlugin({
                terserOptions: {
                    mangle: true,
                    compress: true,
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
});
