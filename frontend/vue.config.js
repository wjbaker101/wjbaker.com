module.exports = {

    outputDir: '../backend/backend.Api/wwwroot',

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
        exclude: [
            '/mitunes/**/*.*',
            '/cambridge-competition-march-2015/**/*.*',
            '/cambridge-competition-christmas-2015/**/*.*',
        ],
    },

    devServer: {
        proxy: {
            '/api': {
                target: 'https://localhost:44356',
                ws: true,
            },
        },
    },
}