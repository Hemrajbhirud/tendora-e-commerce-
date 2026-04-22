const https = require('https');

const typeImages = {
    1: ['Jeans', 'Coat', 'Jacket', 'Sweater', 'T-Shirt', 'Dress', 'Hoodie', 'Blazer', 'Skirt', 'Trousers'],
    2: ['Watch', 'Belt', 'Sunglasses', 'Wallet', 'Necklace', 'Ring', 'Bracelet', 'Backpack', 'Hat', 'Scarf'],
    3: ['Headphones', 'Earbuds', 'Keyboard', 'Mouse', 'Monitor', 'Tablet', 'Smartwatch', 'Speaker', 'Webcam', 'Charger'],
    4: ['Notebook', 'Bottle', 'Bag', 'Planner', 'Candle', 'Diffuser', 'Journal', 'Mug', 'Knapsack', 'Tumbler'],
    5: ['Rug', 'Lamp', 'Cushion', 'Clock', 'Mirror', 'Vase', 'Blanket', 'Chair', 'Table', 'Shelf'],
    6: ['Dumbbells', 'Mat', 'Rope', 'Kettlebell', 'Bands', 'Roller', 'Gymbag', 'Jug', 'Bench', 'Treadmill']
};

const imageMap = {
    'Jeans': ['1542272604-787c3835535d', '1604176354204-9268737828e4'],
    'Coat': ['1539533113208-f6df8cc8b543', '1551028719-0141facfc129'],
    'Jacket': ['1591047139829-d91aecb6caea', '1520975954732-57dd22299614'],
    'Sweater': ['1614975059251-992f11792b9f', '1556821840-3a63f95609a7'],
    'T-Shirt': ['1521572163474-6864f9cf17ab', '1583743814966-8936f5b7be1a'],
    'Dress': ['1515347619362-67fd0b0129dc', '1539008835657-9e8e9680c956'],
    'Hoodie': ['1556821840-3a63f95609a7', '1578587018452-892bacefd3f2'],
    'Blazer': ['1590219582126-78b1d98cc6fc', '1548624149-f9b1859aa7d0'],
    'Skirt': ['1583496661160-c588c4b92b61', '1598282361138-161b45b23d0a'],
    'Trousers': ['1594633313593-cb082fa4b0e7', '1584865288642-42078afe6942'],
    'Watch': ['1524592094714-0f0654e20314', '1523170335258-f5ed11844a49'],
    'Belt': ['1624222247344-550fb60583dc', '1553062407-98eeb64c6a62'],
    'Sunglasses': ['1511499767150-a48a237f0083'],
    'Wallet': ['1627123424574-724758594e93'],
    'Necklace': ['1599643478524-fb66f7f2b189'],
    'Ring': ['1605100804763-247f67b254a6'],
    'Bracelet': ['1611591437281-460bfbe1220a'],
    'Backpack': ['1553062407-98eeb64c6a62'],
    'Hat': ['1580974552431-7290f11acbcf'],
    'Scarf': ['1520638023199-a2e6f4a5dfa9'],
    'Headphones': ['1505740420928-5e560c06d30e'],
    'Earbuds': ['1590658268037-6bf12165a8df'],
    'Keyboard': ['1595225476474-87563907a212'],
    'Mouse': ['1527864550417-7fd91fc51a46'],
    'Monitor': ['1527443224154-c4a3942d3acf'],
    'Tablet': ['1544244015-0df4b3ffc6b0'],
    'Smartwatch': ['1508685096489-7aacd43bd3b1'],
    'Speaker': ['1608043152269-423dbba4e7e1'],
    'Webcam': ['1587826354670-ebe7729f7f89'],
    'Charger': ['1583863788434-e58a36330cf0'],
    'Notebook': ['1531346878377-244dc69772c9'],
    'Bottle': ['1602143407151-7111542de6e8'],
    'Bag': ['1590874103328-eac38a683ce7'],
    'Planner': ['1506784951206-b5ce97b73891'],
    'Candle': ['1603099088713-397a6e138378'],
    'Diffuser': ['1608560370603-9ef4ae6c0953'],
    'Journal': ['1544816155-12df9643f363'],
    'Mug': ['1514228742587-6b1558fcca3d'],
    'Knapsack': ['1553062407-98eeb64c6a62'],
    'Tumbler': ['1577907573199-6f17edab140b'],
    'Rug': ['1534889156217-d643df14f14a'],
    'Lamp': ['1507473885765-e6ed057f782c'],
    'Cushion': ['1584100936595-c0654b35a125'],
    'Clock': ['1563861826-646e7f2c6947'],
    'Mirror': ['1618220179428-22790b46a0eb'],
    'Vase': ['1581783898377-1c85bf937427'],
    'Blanket': ['1580302381282-363e1d6c8b7c'],
    'Chair': ['1503602642458-1428daa9b4b0'],
    'Table': ['1533090368676-1fd25485db88'],
    'Shelf': ['1549488344-c11df5b9e224'],
    'Dumbbells': ['1638202375924-f7fc24bcfe7c'],
    'Mat': ['1601925260368-ae2f83cf8b7f'],
    'Rope': ['1584735935682-2f2b69d4fa8e'],
    'Kettlebell': ['1584735174965-031e874ce2ab'],
    'Bands': ['1598266663439-2056e6900339'],
    'Roller': ['1518310383802-640c2de311b2'],
    'Gymbag': ['1553062407-98eeb64c6a62'],
    'Jug': ['1541348263662-e068362d4904'],
    'Bench': ['1534438327276-14e5300c3a48'],
    'Treadmill': ['1576020556276-02e0ce6ba283']
};

function checkUrl(id) {
    return new Promise((resolve) => {
        const url = `https://images.unsplash.com/photo-${id}?w=800&q=80`;
        https.get(url, (res) => {
            resolve({ id, status: res.statusCode });
        }).on('error', (e) => {
            resolve({ id, status: 500 });
        });
    });
}

async function run() {
    const validMap = {};
    const allPromises = [];
    
    // Create an array of all keys
    for (const [key, ids] of Object.entries(imageMap)) {
        for (const id of ids) {
            allPromises.push(checkUrl(id).then(res => ({ key, id, status: res.status })));
        }
    }
    
    const results = await Promise.all(allPromises);
    
    results.forEach(res => {
        if (!validMap[res.key]) validMap[res.key] = [];
        if (res.status === 200) {
            validMap[res.key].push(res.id);
        }
    });

    console.log(JSON.stringify(validMap, null, 2));
}

run();
