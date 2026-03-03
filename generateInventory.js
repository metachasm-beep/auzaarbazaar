const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'assets', 'products');
const outputJson = path.join(__dirname, 'src', 'data', 'inventory.json');

const categories = {
    "Metalworking Machinery": ["milling", "lathe", "grinder", "grinding", "saw", "shaping", "turning"],
    "Fabrication & Forming": ["press", "drill", "tapping", "thread", "bending", "shearing"],
    "Precision & Measurement": ["dro", "scale", "readout"],
    "Electricals & Spares": ["motor", "switch", "contactor", "relay", "electrical"],
    "Tooling & Accessories": ["vice", "vise", "chuck", "dividing", "collet", "clamping", "edge", "head", "feed", "sleeve"],
    "Industrial Equipment": ["rock breaker", "chisel", "handling", "lubrication"]
};

function assignCategory(filename) {
    const nameLower = filename.toLowerCase();
    for (const [cat, keywords] of Object.entries(categories)) {
        if (keywords.some(k => nameLower.includes(k))) return cat;
    }
    return "Industrial Equipment"; // default
}

function processFilename(filename) {
    let name = filename.replace(/\.(jpeg|jpg|png|webp)$/i, '');
    // Remove size patterns like 1000x1000, 500x500
    name = name.replace(/-\d+x\d+/i, '');
    // Remove "pentagon" globally
    name = name.replace(/pentagon/ig, '');

    // Replace hyphens with spaces and capitalize
    return name.split(/[-\s]+/).filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

async function run() {
    const files = fs.readdirSync(imgDir);
    const inventory = files.map((file, i) => {
        let rawName = processFilename(file);
        if (rawName.trim() === '') rawName = 'Precision Component';

        return {
            id: `prod-${i}`,
            name: rawName,
            category: assignCategory(file),
            brand: "Premium Industrial",
            price: Math.floor(Math.random() * (500000 - 15000) + 15000),
            gst: "18%",
            moq: "1 Unit",
            specs: {
                "Status": "Available",
                "Delivery": "24-48 Hours",
                "Support": "Complete Post-Sale Support"
            },
            image: `/assets/products/${file}`,
            featured: i % 15 === 0 // Make a few featured
        };
    });

    fs.writeFileSync(outputJson, JSON.stringify({ inventory }, null, 2));
    console.log(`Successfully generated inventory.json with ${inventory.length} items.`);
}

run();
