const defaultOptions =
{
    url: '',
    method: 'GET',
    parameters: {},
    headers: [{ header: 'Content-type', value: 'application/x-www-form-urlencoded' }],
};

const ajax = (userOptions) =>
{
    const options = { ...defaultOptions, ...userOptions };
    
    if (options.url.length === 0) throw new Error('Request URL cannot be blank.');

    if (options.method !== 'GET' && options.method !== 'POST') throw new Error('Request method must be GET or POST.');
    
    return new Promise((resolve, reject) =>
    {
        const http = new XMLHttpRequest();

        http.onreadystatechange = () =>
        {
            if (http.readyState === XMLHttpRequest.DONE)
            {
                if (http.status === 200)
                {
                    const response = JSON.parse(http.responseText);

                    resolve(response);
                }
                else
                {
                    reject(http.status);
                }
            }
        };

        const pairs = Object.keys(options.parameters).map((key) => `${key}=${options.parameters[key]}`);

        const joined = pairs.join('&');

        let url = options.url;

        if (options.method === 'GET')
        {
            url += `?${joined}`;
        }

        http.open(options.method, url, true);

        options.headers.forEach((e) => http.setRequestHeader(e.header, e.value));

        if (options.method === 'POST')
            http.send(joined);
        else
            http.send();
    });
};

module.exports = ajax;