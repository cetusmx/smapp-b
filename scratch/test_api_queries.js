const http = require('http');

function makeRequest(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: '75.119.150.222',
            port: 3010,
            path: path,
            method: 'GET',
            headers: {
                'x-api-key': 'sm_ecommerce_x2ve9yFf0aiDxh1HelezpVeyRAcngGwgEg3ZnSZwhGg2SaZrd2gQiysiVo86R3LcUZFFxZDSMADepof1jMLSumIbiqBRcbjyhvA78haaxnLrrbOuU3zqCi0kQXJf1gSc'
            }
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
    const params = [
        '?search=BCTCA15002062128',
        '?q=BCTCA15002062128',
        '?CVE_ART=BCTCA15002062128',
        '?id=BCTCA15002062128',
        '?clave=BCTCA15002062128'
    ];
    for (const p of params) {
        console.log("Testing /api/productos" + p);
        const res = await makeRequest('/api/productos' + p);
        const data = JSON.parse(res.data);
        console.log(`Total: ${data.total}, First item: ${data.data[0].CVE_ART}`);
    }
}
runTests();
