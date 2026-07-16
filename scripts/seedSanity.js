import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Since items.js uses ES modules and we are in a node script, we can just import it dynamically or copy the data.
// Given node script compatibility, we'll import it.
import { PRODUCTS } from '../src/data/items.js';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function seedProducts() {
    console.log('Seeding products to Sanity...');
    
    for (const item of PRODUCTS) {
        // Map local data to Sanity Schema format
        const productDoc = {
            _type: 'product',
            _id: `product-${item.id}`,
            name: item.name,
            slug: { _type: 'slug', current: item.slug },
            status: 'active',
            step: item.step || '00',
            truth: item.truth || '',
            description: item.description || '',
            benefits: item.benefits || [],
            ingredients: (item.keyIngredients || []).map(ing => ({
                _type: 'object',
                _key: Math.random().toString(36).substring(7),
                name: ing.name,
                benefit: ing.benefit
            })),
            texture: item.texture || '',
            usage: item.usage || '',
            // Handle variants based on our 3-tier pricing
            variants: [
                {
                    _key: 'full-vessel',
                    variantType: 'full',
                    priceOneTime: item.fullPrice * 1.25, // Tier 3 penalty
                    price30Day: item.subscriptionPrice || (item.fullPrice * 0.8), // Tier 2
                    price90Day: (item.subscriptionPrice || (item.fullPrice * 0.8)) * 3 * 0.9, // Tier 1 (quarterly total)
                    inventory: {
                        trackInventory: true,
                        quantity: 100,
                        allowBackorder: true
                    }
                },
                {
                    _key: 'refill-cartridge',
                    variantType: 'refill',
                    priceOneTime: item.refillPrice * 1.25,
                    price30Day: item.refillPrice * 0.8,
                    price90Day: (item.refillPrice * 0.8) * 3 * 0.9,
                    inventory: {
                        trackInventory: true,
                        quantity: 100,
                        allowBackorder: true
                    }
                }
            ],
            // Temporary field to hold local image path until assets are uploaded in Studio
            imageSrcFallback: item.imageSrc
        };

        try {
            // Use createIfNotExists or createOrReplace
            const result = await client.createOrReplace(productDoc);
            console.log(`✅ Created/Updated: ${item.name} (${result._id})`);
        } catch (err) {
            console.error(`❌ Failed to create: ${item.name}`, err.message);
        }
    }
    
    console.log('Seeding complete!');
}

seedProducts().catch(console.error);
