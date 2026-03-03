export default {
    name: 'collection',
    title: 'Collection',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Collection Name',
            type: 'string',
            description: 'e.g. "Daily Collection", "Laboratory Collection", "Cellular Chronos"',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            description: 'Collection overview and philosophy'
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string'
                }
            ]
        },
        {
            name: 'featuredProducts',
            title: 'Featured Products',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'product' } }],
            description: 'Manually curated products for this collection'
        },
        {
            name: 'sortOrder',
            title: 'Sort Order',
            type: 'number',
            description: 'Order in which collections appear (lower numbers first)',
            initialValue: 0
        },
        {
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Override default title for search engines'
        },
        {
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3,
            description: 'Meta description for search engines (155 characters)',
            validation: Rule => Rule.max(155)
        }
    ],
    preview: {
        select: {
            title: 'name',
            media: 'heroImage',
            sortOrder: 'sortOrder'
        },
        prepare({ title, media, sortOrder }) {
            return {
                title,
                media,
                subtitle: `Order: ${sortOrder || 0}`
            }
        }
    },
    orderings: [
        {
            title: 'Sort Order',
            name: 'sortOrder',
            by: [
                { field: 'sortOrder', direction: 'asc' }
            ]
        }
    ]
}
