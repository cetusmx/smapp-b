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
    try {
        console.log("Testing /api/productos?CVE_ART=BCTCA15002062128");
        let res = await makeRequest('/api/productos?CVE_ART=BCTCA15002062128');
        console.log(`Status: ${res.status}, Data: ${res.data.substring(0, 500)}`);
        
        console.log("Testing /api/productos/BCTCA15002062128");
        res = await makeRequest('/api/productos/BCTCA15002062128');
        console.log(`Status: ${res.status}, Data: ${res.data.substring(0, 500)}`);
        
        console.log("Testing /api/productos?clave=GH5331253250500");
        res = await makeRequest('/api/productos?clave=GH5331253250500');
        console.log(`Status: ${res.status}, Data: ${res.data.substring(0, 500)}`);
        
        console.log("Testing /api/productos/GH5331253250500");
        res = await makeRequest('/api/productos/GH5331253250500');
        console.log(`Status: ${res.status}, Data: ${res.data.substring(0, 500)}`);
    } catch (e) {
        console.error(e.message);
    }
}
runTests();
