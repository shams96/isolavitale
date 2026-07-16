// Run this script from the project root using Node.js to seed Sanity:
// node scratch/seed-sanity.js

import { createClient } from '@sanity/client';
import { PRODUCTS } from '../src/data/items.js';

// IMPORTANT: Set these to your actual Sanity details
const projectId = 'bxfrleka';
const dataset = 'production';
const token = 'YOUR_SANITY_API_WRITE_TOKEN_HERE';

if (!token || token === 'YOUR_SANITY_API_WRITE_TOKEN_HERE') {
    console.error('ERROR: You must provide a valid Sanity API Write Token in scratch/seed-sanity.js');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    useCdn: false,
    apiVersion: '2024-01-01',
    token
});

async function seedProducts() {
    console.log('Seeding products to Sanity...');
    for (const product of PRODUCTS) {
        const doc = {
            _type: 'product',
            _id: `product-${product.id}`,
            name: product.name,
            slug: { _type: 'slug', current: product.slug },
            status: 'active',
            step: product.step || '01',
            truth: product.truth || '',
            description: product.description || '',
            texture: product.texture || '',
            usage: product.usage || '',
            fullPrice: product.fullPrice,
            refillPrice: product.refillPrice,
            // Calculate new tiers based on items.js
            priceOneTime: Number((product.fullPrice * 1.25).toFixed(2)),
            price30Day: product.subscriptionPrice || Number((product.fullPrice * 0.8).toFixed(2)),
            price90Day: Number(((product.subscriptionPrice || (product.fullPrice * 0.8)) * 3 * 0.9).toFixed(2)),
        };

        try {
            await client.createOrReplace(doc);
            console.log(`✅ Seeded: ${product.name}`);
        } catch (err) {
            console.error(`❌ Failed to seed ${product.name}:`, err.message);
        }
    }
    console.log('Finished seeding products.');
}

seedProducts();
