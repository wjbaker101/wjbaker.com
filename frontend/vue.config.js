module.exports = {

    chainWebpack(config) {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();
        svgRule.use('vue-svg-loader').loader('vue-svg-loader');
    },

    css: {
        loaderOptions: {
            sass: {
                prependData: `@import 'src/style/global.scss';`,
            },
        },
    },

    pwa: {
        name: 'wjbaker.com',
        themeColor: '#176bc0',
        msTileColor: '#176bc0',
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
                target: 'http://localhost:44356',
                ws: true,
            },
        },
    },
}