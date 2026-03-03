export default {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title (Internal)',
            type: 'string'
        },
        {
            name: 'heroHeadline',
            title: 'Hero Headline',
            type: 'string'
        },
        {
            name: 'heroSubheadline',
            title: 'Hero Subheadline',
            type: 'string'
        },
        {
            name: 'heroImage',
            title: 'Hero Background Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'heroCta',
            title: 'Hero CTA Text',
            type: 'string'
        }
    ]
}
