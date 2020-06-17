import mysql from 'mysql';

import secretConfig from '@common/config/secret-properties.json';

const connection = mysql.createConnection(secretConfig.wjbakerDB);

export const MySQLClient = {

    query<T>(sql: string, values: any): Promise<T> {
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (error, results, fields) => {
                if (error) {
                    return reject(error);
                }

                return resolve(results);
            });
        });
    },
}
