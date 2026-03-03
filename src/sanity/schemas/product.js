export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    groups: [
        { name: 'basic', title: 'Basic Info', default: true },
        { name: 'details', title: 'Details & Description' },
        { name: 'pricing', title: 'Pricing & Variants' },
        { name: 'media', title: 'Media & Assets' },
        { name: 'seo', title: 'SEO & Metadata' },
    ],
    fields: [
        // BASIC INFO
        {
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: Rule => Rule.required(),
            group: 'basic'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
            group: 'basic'
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Active', value: 'active' },
                    { title: 'Draft', value: 'draft' },
                    { title: 'Archived', value: 'archived' },
                ],
                layout: 'radio'
            },
            initialValue: 'draft',
            group: 'basic'
        },
        {
            name: 'step',
            title: 'Ritual Step',
            type: 'string',
            description: 'e.g. "01", "02"',
            validation: Rule => Rule.required(),
            group: 'basic'
        },
        {
            name: 'collection',
            title: 'Collection',
            type: 'reference',
            to: [{ type: 'collection' }],
            group: 'basic'
        },

        // DETAILS & DESCRIPTION
        {
            name: 'truth',
            title: 'The Truth (Tagline)',
            type: 'string',
            description: 'One-line philosophy (e.g. "The architect of cellular longevity.")',
            group: 'details'
        },
        {
            name: 'description',
            title: 'Description (What It Does)',
            type: 'text',
            rows: 4,
            group: 'details'
        },
        {
            name: 'benefits',
            title: 'Key Benefits',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Bullet points of key benefits',
            group: 'details'
        },
        {
            name: 'ingredients',
            title: 'Active Ingredients',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'name', title: 'Ingredient Name', type: 'string' },
                    { name: 'benefit', title: 'Benefit', type: 'text', rows: 2 },
                    { name: 'percentage', title: 'Percentage (optional)', type: 'string' }
                ]
            }],
            group: 'details'
        },
        {
            name: 'texture',
            title: 'Sensory Profile (Texture)',
            type: 'text',
            rows: 2,
            group: 'details'
        },
        {
            name: 'usage',
            title: 'Ritual (How to Use)',
            type: 'text',
            rows: 3,
            group: 'details'
        },
        {
            name: 'size',
            title: 'Size/Volume',
            type: 'string',
            description: 'e.g. "50ml", "30ml"',
            group: 'details'
        },

        // PRICING & VARIANTS
        {
            name: 'variants',
            title: 'Product Variants',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'variantType',
                        title: 'Variant Type',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Full Vessel', value: 'full' },
                                { title: 'Refill Cartridge', value: 'refill' },
                            ]
                        }
                    },
                    {
                        name: 'price',
                        title: 'Price',
                        type: 'number',
                        validation: Rule => Rule.required().positive()
                    },
                    {
                        name: 'compareAtPrice',
                        title: 'Compare at Price (optional)',
                        type: 'number',
                        description: 'Original price for showing discounts'
                    },
                    {
                        name: 'sku',
                        title: 'SKU',
                        type: 'string'
                    },
                    {
                        name: 'inventory',
                        title: 'Inventory',
                        type: 'object',
                        fields: [
                            {
                                name: 'trackInventory',
                                title: 'Track Inventory',
                                type: 'boolean',
                                initialValue: true
                            },
                            {
                                name: 'quantity',
                                title: 'Quantity in Stock',
                                type: 'number',
                                initialValue: 0
                            },
                            {
                                name: 'allowBackorder',
                                title: 'Allow Backorder',
                                type: 'boolean',
                                initialValue: false
                            }
                        ]
                    }
                ],
                preview: {
                    select: {
                        title: 'variantType',
                        price: 'price',
                        quantity: 'inventory.quantity'
                    },
                    prepare({ title, price, quantity }) {
                        return {
                            title: title === 'full' ? 'Full Vessel' : 'Refill Cartridge',
                            subtitle: `$${price} • ${quantity} in stock`
                        }
                    }
                }
            }],
            group: 'pricing'
        },
        {
            name: 'fullPrice',
            title: 'Full Vessel Price (Legacy)',
            type: 'number',
            description: 'Deprecated: Use variants instead',
            hidden: true,
            group: 'pricing'
        },
        {
            name: 'refillPrice',
            title: 'Refill Cartridge Price (Legacy)',
            type: 'number',
            description: 'Deprecated: Use variants instead',
            hidden: true,
            group: 'pricing'
        },

        // MEDIA & ASSETS
        {
            name: 'image',
            title: 'Main Product Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    validation: Rule => Rule.required()
                }
            ],
            group: 'media'
        },
        {
            name: 'gallery',
            title: 'Product Gallery',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [
                    {
                        name: 'alt',
                        title: 'Alt Text',
                        type: 'string'
                    }
                ]
            }],
            group: 'media'
        },
        {
            name: 'video',
            title: 'Product Video (optional)',
            type: 'file',
            options: {
                accept: 'video/*'
            },
            group: 'media'
        },

        // SEO & METADATA
        {
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Override default title for search engines',
            group: 'seo'
        },
        {
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3,
            description: 'Meta description for search engines (155 characters)',
            validation: Rule => Rule.max(155),
            group: 'seo'
        },
        {
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            },
            group: 'seo'
        },

        // RECOMMENDATIONS & UPSELLS
        {
            name: 'recommendations',
            title: 'Recommended Pairings (Upsells)',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'product' } }],
            description: 'Products to suggest when this item is in the cart.',
            group: 'basic'
        },
        {
            name: 'featured',
            title: 'Featured Product',
            type: 'boolean',
            description: 'Show on homepage',
            initialValue: false,
            group: 'basic'
        }
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            status: 'status',
            step: 'step'
        },
        prepare({ title, media, status, step }) {
            return {
                title: `${step ? `Step ${step}: ` : ''}${title}`,
                media,
                subtitle: status ? status.toUpperCase() : 'DRAFT'
            }
        }
    }
}
