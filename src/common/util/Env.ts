import config from '@common/config/config.json';

interface IConfig {
    backend: {
        port: number,
        baseURL: string,
    },
}

class _Env {

    isProduction() {
        return process.env.NODE_ENV === 'production';
    }

    value<T>(productionValue: T, elseValue: T): T {
        return this.isProduction() ? productionValue : elseValue;
    }

    config(): IConfig {
        return config[this.isProduction() ? 'production' : 'dev'];
    }
}

export const Env = new _Env();
