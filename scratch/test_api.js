const http = require('http');

function makeRequest(path, headers) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: '75.119.150.222',
            port: 3010,
            path: path,
            method: 'GET',
            headers: headers
        };
        const req = http.request(options, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        });
        req.on('error', error => reject(error));
        req.end();
    });
}

async function runTests() {
    const key = 'sm_ecommerce_x2ve9yFf0aiDxh1HelezpVeyRAcngGwgEg3ZnSZwhGg2SaZrd2gQiysiVo86R3LcUZFFxZDSMADepof1jMLSumIbiqBRcbjyhvA78haaxnLrrbOuU3zqCi0kQXJf1gSc';
    const paths = ['/', '/api', '/productos', '/api/productos', '/products'];
    const headerConfigs = [
        { 'x-api-key': key },
        { 'Authorization': 'Bearer ' + key },
        { 'api-key': key }
    ];

    for (let path of paths) {
        for (let headers of headerConfigs) {
            try {
                const res = await makeRequest(path, headers);
                if (res.status !== 401 && res.status !== 403) {
                    console.log(`SUCCESS on ${path} with headers ${JSON.stringify(headers)} -> Status: ${res.status}, Data: ${res.data.substring(0, 100)}`);
                }
            } catch (e) {
                console.error(e.message);
            }
        }
    }
}
runTests();
