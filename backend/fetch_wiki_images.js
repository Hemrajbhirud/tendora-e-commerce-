const fs = require('fs');
const https = require('https');

const types = [
    'Jeans', 'Coat', 'Jacket', 'Sweater', 'T-Shirt', 'Dress', 'Hoodie', 'Blazer', 'Skirt', 'Trousers',
    'Shorts', 'Cardigan', 'Suit', 'Leggings', 'Vest',
    'Watch', 'Belt', 'Sunglasses', 'Wallet', 'Necklace', 'Ring', 'Bracelet', 'Backpack', 'Hat', 'Scarf',
    'Tie', 'Beanie', 'Earrings', 'Gloves', 'Cufflinks',
    'Headphones', 'Earbuds', 'Keyboard', 'Mouse', 'Monitor', 'Tablet', 'Smartwatch', 'Speaker', 'Webcam', 'Charger',
    'Microphone', 'Router', 'Projector', 'Tripod', 'Drone',
    'Notebook', 'Bottle', 'Bag', 'Planner', 'Candle', 'Diffuser', 'Journal', 'Mug', 'Knapsack', 'Tumbler',
    'Pen', 'Calendar', 'Keychain', 'Coaster', 'Hammock',
    'Rug', 'Lamp', 'Cushion', 'Clock', 'Mirror', 'Vase', 'Blanket', 'Chair', 'Table', 'Shelf',
    'Sofa', 'Desk', 'Bed', 'Wardrobe', 'Bookshelf',
    'Dumbbells', 'Mat', 'Rope', 'Kettlebell', 'Bands', 'Roller', 'Gymbag', 'Jug', 'Bench', 'Treadmill',
    'Barbell', 'Towel', 'Pedometer', 'Stepper', 'Trampoline'
];

// Wikipedia search mapping for better results
const wikiMap = {
    'T-Shirt': 'T-shirt',
    'Bottle': 'Water_bottle',
    'Bag': 'Tote_bag',
    'Knapsack': 'Backpack',
    'Mat': 'Yoga_mat',
    'Rope': 'Jump_rope',
    'Bands': 'Resistance_band',
    'Roller': 'Foam_roller',
    'Gymbag': 'Duffel_bag',
    'Jug': 'Jug',
    'Bench': 'Bench_(weight_training)',
    'Belt': 'Belt_(clothing)',
    'Ring': 'Ring_(jewellery)',
    'Earbuds': 'Headphones',
    'Keyboard': 'Computer_keyboard',
    'Monitor': 'Computer_monitor',
    'Tablet': 'Tablet_computer',
    'Speaker': 'Loudspeaker',
    'Charger': 'Battery_charger',
    'Planner': 'Personal_organizer',
    'Diffuser': 'Aroma_lamp',
    'Journal': 'Diary',
    'Tumbler': 'Tumbler_(glass)',
    'Rug': 'Rug',
    'Lamp': 'Lamp',
    'Table': 'Table_(furniture)',
    'Shelf': 'Shelf_(storage)',
    'Dumbbells': 'Dumbbell',
    'Cardigan': 'Cardigan_(sweater)',
    'Suit': 'Suit',
    'Microphone': 'Microphone',
    'Router': 'Router_(computing)',
    'Projector': 'Video_projector',
    'Tripod': 'Tripod_(photography)',
    'Drone': 'Unmanned_aerial_vehicle',
    'Pen': 'Pen',
    'Calendar': 'Calendar',
    'Keychain': 'Keychain',
    'Coaster': 'Drink_coaster',
    'Hammock': 'Hammock',
    'Sofa': 'Couch',
    'Desk': 'Desk',
    'Bed': 'Bed',
    'Wardrobe': 'Wardrobe',
    'Bookshelf': 'Bookcase',
    'Barbell': 'Barbell',
    'Towel': 'Towel',
    'Pedometer': 'Pedometer',
    'Stepper': 'Stairmaster',
    'Trampoline': 'Trampoline'
};

function getWikiImage(type) {
    const title = wikiMap[type] || type;
    return new Promise((resolve) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title)}`;
        https.get(url, { headers: { 'User-Agent': 'TrendoraSeederScript/1.0 (test@example.com)' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pageId !== '-1' && pages[pageId].original) {
                        resolve(pages[pageId].original.source);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

async function run() {
    const results = {};
    for (const type of types) {
        let img = await getWikiImage(type);
        if (!img) {
            // Fallback to placehold.co
            img = `https://placehold.co/800x800/f3f4f6/111827?text=${encodeURIComponent(type)}&font=montserrat`;
        }
        results[type] = img;
    }
    
    fs.writeFileSync('wiki_images.json', JSON.stringify(results, null, 2));
    console.log('Saved to wiki_images.json!');
}

run();
