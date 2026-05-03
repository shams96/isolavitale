export default {
    name: 'settings',
    title: 'Site Settings',
    type: 'document',
    groups: [
        { name: 'general', title: 'General', default: true },
        { name: 'shipping', title: 'Shipping & Tax' },
        { name: 'social', title: 'Social Media' },
        { name: 'analytics', title: 'Analytics & Tracking' },
    ],
    fields: [
        // GENERAL
        {
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
            description: 'Aurabio',
            group: 'general'
        },
        {
            name: 'siteUrl',
            title: 'Site URL',
            type: 'url',
            description: 'https://aurabio.com',
            group: 'general'
        },
        {
            name: 'announcement',
            title: 'Announcement Bar',
            type: 'object',
            fields: [
                {
                    name: 'enabled',
                    title: 'Show Announcement',
                    type: 'boolean',
                    initialValue: false
                },
                {
                    name: 'text',
                    title: 'Announcement Text',
                    type: 'string',
                    description: 'e.g. "Free shipping on orders over $100"'
                },
                {
                    name: 'link',
                    title: 'Link (optional)',
                    type: 'url'
                }
            ],
            group: 'general'
        },
        {
            name: 'logo',
            title: 'Site Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
            group: 'general'
        },
        {
            name: 'favicon',
            title: 'Favicon',
            type: 'image',
            group: 'general'
        },

        // SHIPPING & TAX
        {
            name: 'freeShippingThreshold',
            title: 'Free Shipping Threshold',
            type: 'number',
            description: 'Minimum order value for free shipping (e.g. 100)',
            initialValue: 100,
            group: 'shipping'
        },
        {
            name: 'shippingRates',
            title: 'Shipping Rates',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'country',
                        title: 'Country/Region',
                        type: 'string'
                    },
                    {
                        name: 'rate',
                        title: 'Shipping Rate',
                        type: 'number'
                    },
                    {
                        name: 'estimatedDays',
                        title: 'Estimated Delivery (days)',
                        type: 'string',
                        description: 'e.g. "3-5"'
                    }
                ]
            }],
            group: 'shipping'
        },
        {
            name: 'taxRate',
            title: 'Default Tax Rate',
            type: 'number',
            description: 'Percentage (e.g. 8.5 for 8.5%)',
            group: 'shipping'
        },

        // SOCIAL MEDIA
        {
            name: 'instagram',
            title: 'Instagram URL',
            type: 'url',
            group: 'social'
        },
        {
            name: 'facebook',
            title: 'Facebook URL',
            type: 'url',
            group: 'social'
        },
        {
            name: 'twitter',
            title: 'Twitter/X URL',
            type: 'url',
            group: 'social'
        },
        {
            name: 'pinterest',
            title: 'Pinterest URL',
            type: 'url',
            group: 'social'
        },
        {
            name: 'tiktok',
            title: 'TikTok URL',
            type: 'url',
            group: 'social'
        },

        // ANALYTICS & TRACKING
        {
            name: 'googleAnalyticsId',
            title: 'Google Analytics ID',
            type: 'string',
            description: 'GA4 Measurement ID (e.g. G-XXXXXXXXXX)',
            group: 'analytics'
        },
        {
            name: 'facebookPixelId',
            title: 'Facebook Pixel ID',
            type: 'string',
            group: 'analytics'
        },
        {
            name: 'tiktokPixelId',
            title: 'TikTok Pixel ID',
            type: 'string',
            group: 'analytics'
        },

        // EMAIL
        {
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            description: 'Email for customer inquiries',
            group: 'general'
        },
        {
            name: 'supportEmail',
            title: 'Support Email',
            type: 'string',
            description: 'Email for order confirmations',
            group: 'general'
        }
    ],
    preview: {
        prepare() {
            return {
                title: 'Site Settings'
            }
        }
    }
}
