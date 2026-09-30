const http = require('http');

function makeRequest(claves) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({ claves: claves });
        const options = {
            hostname: '75.119.150.222',
            port: 3010,
            path: '/api/productos/consulta',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
                'x-api-key': 'sm_ecommerce_x2ve9yFf0aiDxh1HelezpVeyRAcngGwgEg3ZnSZwhGg2SaZrd2gQiysiVo86R3LcUZFFxZDSMADepof1jMLSumIbiqBRcbjyhvA78haaxnLrrbOuU3zqCi0kQXJf1gSc'
            }
        };
        const req = http.request(options, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        });
        req.on('error', error => reject(error));
        req.write(payload);
        req.end();
    });
}

async function run() {
    console.log("Testeando llave de 16: PH78040005000125");
    let res1 = await makeRequest(["PH78040005000125"]);
    console.log(` Status: ${res1.status}`);
}
run();
