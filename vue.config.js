const CopyWebpackPlugin = require('copy-webpack-plugin');

const appConfig = require('./src/common/config/config.json');

const THEME_COLOUR = '#176bc0';

module.exports = {

    outputDir: './build/frontend',

    chainWebpack(config) {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule.use('vue-svg-loader').loader('vue-svg-loader');

        config.plugin('fork-ts-checker')
            .tap(args => {
                args[0].tsconfig = './tsconfig.frontend.json';
                return args;
            });

        config.plugin('html')
            .tap(args => {
                args[0].template = './src/frontend/public/index.html';
                return args;
            });
    },

    configureWebpack: {
        resolve: {
            alias: {
                '@common': __dirname + '/src/common',
                '@frontend': __dirname + '/src/frontend',
            },
        },
        entry: {
            app: './src/frontend/main.ts',
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/frontend/public/', to: '.' },
                ],
            }),
        ],
    },

    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import '@frontend/style/global.scss';
                `,
            },
        },
    },

    pwa: {
        name: 'wjbaker.com',
        themeColor: THEME_COLOUR,
        msTileColor: THEME_COLOUR,
        manifestOptions: {
            display: 'minimal-ui',
        },
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon-180x180.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/msapplication-icon-144x144.png',
        },
    },

    devServer: {
        proxy: {
            '/api': {
                target: `http://localhost:${appConfig.dev.backend.port}`,
                ws: true,
            },
        },
    },
}