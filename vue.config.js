module.exports = {

    chainWebpack: config => {
        config.module.rules.delete('svg');
    },

    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    loader: 'vue-svg-loader',
                },
            ],
        }
    },

    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import '@/style/_style.scss';
                `
            }
        }
    },

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8082',
                ws: true,
                changeOrigin: true,
            }
        }
    },
};