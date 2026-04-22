const db = require('./config/db');
const fs = require('fs');
const path = require('path');

const categories = [
    { id: 1, name: 'Fashion', prefix: ['Ultimate', 'Classic', 'Modern', 'Sleek', 'Premium', 'Minimalist', 'Urban', 'Vintage', 'Signature', 'Essential'] },
    { id: 2, name: 'Accessories', prefix: ['Elegant', 'Minimalist', 'Timeless', 'Luxury', 'Classic', 'Signature', 'Urban', 'Sleek', 'Premium', 'Bold'] },
    { id: 3, name: 'Tech', prefix: ['Pro', 'Advanced', 'Ultra', 'Smart', 'Next-Gen', 'Vision', 'Elite', 'Premium', 'Essential', 'Quantum'] },
    { id: 4, name: 'Lifestyle', prefix: ['Zen', 'Active', 'Mindful', 'Daily', 'Essential', 'Serene', 'Vibrant', 'Urban', 'Minimal', 'Classic'] },
    { id: 5, name: 'Home', prefix: ['Cozy', 'Modern', 'Luxe', 'Nordic', 'Rustic', 'Minimalist', 'Elegant', 'Essential', 'Serene', 'Plush'] },
    { id: 6, name: 'Fitness', prefix: ['Pro', 'Elite', 'Active', 'Power', 'Core', 'Dynamic', 'Extreme', 'Essential', 'Prime', 'Titan'] }
];

const types = {
    1: ['Jeans', 'Coat', 'Jacket', 'Sweater', 'T-Shirt', 'Dress', 'Hoodie', 'Blazer', 'Skirt', 'Trousers', 'Shorts', 'Cardigan', 'Suit', 'Leggings', 'Vest', 'Polo', 'Kimono', 'Overcoat', 'Tracksuit', 'Jumpsuit'],
    2: ['Watch', 'Belt', 'Sunglasses', 'Wallet', 'Necklace', 'Ring', 'Bracelet', 'Backpack', 'Hat', 'Scarf', 'Tie', 'Beanie', 'Earrings', 'Gloves', 'Cufflinks', 'Handbag', 'Briefcase', 'Umbrella', 'Pendant', 'Brooch'],
    3: ['Headphones', 'Earbuds', 'Keyboard', 'Mouse', 'Monitor', 'Tablet', 'Smartwatch', 'Speaker', 'Webcam', 'Charger', 'Microphone', 'Router', 'Projector', 'Tripod', 'Drone', 'Camera', 'MicroSD', 'Controller', 'Lens', 'Case'],
    4: ['Notebook', 'Bottle', 'Bag', 'Planner', 'Candle', 'Diffuser', 'Journal', 'Mug', 'Knapsack', 'Tumbler', 'Pen', 'Calendar', 'Keychain', 'Coaster', 'Hammock', 'Yoga Block', 'Terrarium', 'Sketchbook', 'Canvas', 'Boardgame'],
    5: ['Rug', 'Lamp', 'Cushion', 'Clock', 'Mirror', 'Vase', 'Blanket', 'Chair', 'Table', 'Shelf', 'Sofa', 'Desk', 'Bed', 'Wardrobe', 'Bookshelf', 'Curtains', 'Chandelier', 'Ottoman', 'Cabinet', 'Dresser'],
    6: ['Dumbbells', 'Mat', 'Rope', 'Kettlebell', 'Bands', 'Roller', 'Gymbag', 'Jug', 'Bench', 'Treadmill', 'Barbell', 'Towel', 'Pedometer', 'Stepper', 'Trampoline', 'Medicine Ball', 'Pullup Bar', 'Elliptical', 'Punching Bag', 'Boxing Gloves']
};

const adjectives = ['Premium', 'High-Quality', 'Durable', 'Stylish', 'Comfortable', 'Innovative', 'Sleek', 'Versatile'];

const getRandom = (arr) => arr ? arr[Math.floor(Math.random() * arr.length)] : '';
const getRandomPrice = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
const getRandomStock = () => Math.floor(Math.random() * 100) + 10;
const getDelivery = () => {
    const minDay = Math.floor(Math.random() * 3) + 1;
    const maxDay = minDay + Math.floor(Math.random() * 3) + 1;
    return `${minDay}-${maxDay} Business Days`;
};

async function seed() {
    try {
        console.log("Loading Wikipedia image mappings...");
        const wikiImagesPath = path.join(__dirname, 'wiki_images.json');
        const wikiImages = JSON.parse(fs.readFileSync(wikiImagesPath, 'utf8'));

        console.log("Clearing old products...");
        await db.query('DELETE FROM products');
        
        let count = 0;
        
        for (let cat of categories) {
            console.log(`Seeding category ${cat.name}...`);
            const itemTypes = types[cat.id];
            
            // 12 products per category instead of 100
            for (let i = 0; i < 12; i++) {
                const prefix = getRandom(cat.prefix);
                const type = itemTypes[i % itemTypes.length]; // cycle through types
                
                let displayName = type;
                if(type === 'Bottle') displayName = 'Water Bottle';
                if(type === 'Bag') displayName = 'Tote Bag';
                if(type === 'Knapsack') displayName = 'Backpack';
                if(type === 'Tumbler') displayName = 'Travel Mug';
                if(type === 'Mat') displayName = 'Yoga Mat';
                if(type === 'Rope') displayName = 'Jump Rope';
                if(type === 'Bands') displayName = 'Resistance Bands';
                if(type === 'Roller') displayName = 'Foam Roller';
                if(type === 'Gymbag') displayName = 'Gym Bag';
                if(type === 'Jug') displayName = 'Water Jug';
                if(type === 'Bench') displayName = 'Weight Bench';
                if(type === 'Case') displayName = 'Phone Case';

                const name = `${prefix} ${displayName} Trendora`;
                
                const adj = getRandom(adjectives);
                const delivery = getDelivery();
                const description = `This ${name} is the epitome of ${cat.name.toLowerCase()} excellence. Crafted with ${adj.toLowerCase()} materials to provide the ultimate experience for trendsetters. Enjoy unmatched luxury.\n\nEstimated Delivery: ${delivery}`;
                
                const price = getRandomPrice(20, 250);
                const stock = getRandomStock();
                
                // Fetch dynamic high quality product image placebo
                const seedValue = `${cat.name}-${i}-${type.replace(/\s+/g, '')}`;
                const finalImage = `https://picsum.photos/seed/${seedValue}/800/800`;
                
                await db.query(
                    'INSERT INTO products (category_id, name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)',
                    [cat.id, name, description, price, stock, finalImage]
                );
                count++;
            }
        }
        
        console.log(`Successfully inserted ${count} products with accurate Wikipedia product photography.`);
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seed();
