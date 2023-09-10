'use strict';
/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { exec } = require('promisify-child-process');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const { AngularWebpackPlugin } = require('@ngtools/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const axios = require('axios');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpackUtils = require('../../moonsphere-base/webpack/webpack-utils.cjs');

const envPath = path.resolve(__dirname, '..', '..', 'moonsphere-base', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const commonResolveConfig = isProdMode => ({
  extensions: ['.js', '.ts'],
  alias: {
    '../environments/build-specifics': path.resolve(
      __dirname,
      '..',
      'src',
      'environments',
      `build-specifics${isProdMode ? '.prod' : ''}`
    ),
    '~/env': path.resolve(__dirname, 'src', 'environments'),
    '~/root-mod': path.resolve(__dirname, 'src', 'app'),
    '~/auth-mod': path.resolve(__dirname, 'src', 'app', 'modules', 'auth'),
    '~/client-mod': path.resolve(__dirname, 'src', 'app', 'modules', 'client'),
    '~/shared-mod': path.resolve(__dirname, 'src', 'app', 'modules', 'shared'),
  },
});

const postCssConfig = {
  postcssOptions: {
    plugins: [
      require('autoprefixer'),
      require('postcss-preset-env'),
      require('tailwindcss'),
    ],
  },
};

const commonWebpackConfig = ({
  landingPageBaseUrl,
  clientBaseUrl,
  cdnBaseUrl,
  javaApiEurekaUrl,
  isProdMode,
}) =>
  webpackUtils.webpackProxyInjector(
    { cdnBaseUrl },
    {
      context: path.resolve(__dirname, '..'),
      entry: {
        polyfills: [path.resolve(__dirname, '..', 'src', 'polyfills.ts')],
        main: [path.resolve(__dirname, '..', 'src', 'main.ts')],
        vendor: [path.resolve(__dirname, '..', 'src', 'styles', 'vendor.scss')],
        custom: [
          path.resolve(__dirname, '..', 'src', 'styles', 'combined.scss'),
        ],
      },
      output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: `js/__msph.[${
          isProdMode ? 'contenthash:10' : 'name'
        }].bundle.js`,
        chunkFilename: `js/__msph.[${
          isProdMode ? 'contenthash:10' : 'name'
        }].chunk.js`,
        clean: true,
        publicPath: '/',
      },
      resolve: commonResolveConfig(isProdMode),
      module: {
        rules: [
          {
            test: /\.[cm]?[tj]s?$/,
            use: webpackUtils.angularCommonWebpackTsLoaders,
          },
          webpackUtils.angularCommonWebpackScssLoader({
            includePath: path.resolve(__dirname, '..', 'src', 'app'),
            excludePath: path.resolve(__dirname, '..', 'src', 'styles'),
            postCssConfig,
          }),
          webpackUtils.tailwindGlobalSassLoader({
            stylesPath: path.resolve(__dirname, '..', 'src', 'styles'),
            postCssConfig,
            miniCssLoader: MiniCssExtractPlugin.loader,
            cdnBaseUrl,
          }),
        ],
      },
      optimization: {
        minimize: isProdMode,
        splitChunks: webpackUtils.commonNodeModulesChunkSplitting,
      },
      plugins: [
        new RemoveEmptyScriptsPlugin(),
        new DefinePlugin({
          'process.env.IS_PRODUCTION_MODE': JSON.stringify(isProdMode),
          'process.env.BASE_LANDING_PAGE_URL':
            JSON.stringify(landingPageBaseUrl),
          'process.env.BASE_CLIENT_URL': JSON.stringify(clientBaseUrl),
          'process.env.BASE_CDN_URL': JSON.stringify(cdnBaseUrl),
          'process.env.HCAPTCHA_SITE_KEY': JSON.stringify(
            isProdMode
              ? process.env.ENV_MSPH_HCAPTCHA_SITE_KEY
              : process.env.ENV_MSPH_DEV_HCAPTCHA_SITE_KEY
          ),
          'process.env.JAVA_API_EUREKA_URL': JSON.stringify(javaApiEurekaUrl),
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '..', 'src', 'index.ejs'),
          title: 'MoonSphere',
          inject: 'body',
          scriptLoading: 'blocking',
          templateParameters: async (
            compilation,
            assets,
            assetTags,
            options
          ) => {
            const { stdout } = await exec(
              'npm list @angular/core --depth=0 --json'
            );
            const { data } = await axios(
              `${cdnBaseUrl}/static/i18n/web-common/en-US.json`
            );
            const { description, keywords } =
              data['msph.webCommon.metaProperty'];
            return {
              compilation,
              webpackConfig: compilation.options,
              htmlWebpackPlugin: {
                tags: assetTags,
                files: assets,
                options,
              },
              externalCdnBasePath: cdnBaseUrl,
              externalClientBasePath: clientBaseUrl,
              frontEndGenerator: `Angular ${
                JSON.parse(stdout).dependencies['@angular/core'].version
              }`,
              metaDescription: description,
              metaKeywords: keywords,
            };
          },
          minify: {
            minifyCSS: isProdMode,
            minifyJS: isProdMode,
            html5: isProdMode,
            removeComments: false,
            collapseWhitespace: true,
          },
        }),
        new MiniCssExtractPlugin({
          filename: `css/__msph.[${
            isProdMode ? 'contenthash:10' : 'name'
          }].bundle.css`,
          chunkFilename: `css/__msph.[${
            isProdMode ? 'contenthash:10' : 'name'
          }].chunk.css`,
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, '..', 'src', 'assets', 'manifest'),
              to: path.resolve(__dirname, '..', 'dist', 'assets', 'manifest'),
              transform(content, _) {
                return Buffer.from(
                  content
                    .toString()
                    .replace(/__CDN_BASE_URL__/g, cdnBaseUrl)
                    .replace(/__CLIENT_BASE_URL__/g, clientBaseUrl)
                );
              },
            },
            {
              from: path.resolve(__dirname, '..', '.htaccess'),
              to: path.resolve(__dirname, '..', 'dist'),
            },
          ],
        }),
        new MomentLocalesPlugin(webpackUtils.webpackMomentLocalesCommonConfig),
        new AngularWebpackPlugin({
          tsconfig: path.resolve(
            __dirname,
            '..',
            '_tsconfig',
            `tsconfig.app${isProdMode ? '.prod' : ''}.json`
          ),
          sourceMap: !isProdMode,
          jitMode: false,
          directTemplateLoading: true,
        }),
      ],
    }
  );

module.exports = {
  commonResolveConfig,
  postCssConfig,
  commonWebpackConfig,
};
