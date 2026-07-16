export default {
    name: 'checkoutSettings',
    title: 'Checkout & Cart Settings',
    type: 'document',
    groups: [
        { name: 'general', title: 'General Mechanics', default: true },
        { name: 'ambassadors', title: 'Ambassador Quotes' },
        { name: 'trust', title: 'Trust & Transparency' }
    ],
    fields: [
        // GENERAL MECHANICS
        {
            name: 'masterclassProduct',
            title: 'Masterclass Product Reference',
            type: 'reference',
            to: [{ type: 'product' }],
            description: 'The digital Masterclass product to auto-add for 90-day subscribers.',
            group: 'general'
        },
        {
            name: 'masterclassValue',
            title: 'Masterclass Value Display',
            type: 'string',
            initialValue: '$99 Value',
            group: 'general'
        },
        {
            name: 'giftThreshold',
            title: 'Gift Progress Threshold',
            type: 'string',
            description: 'e.g. "90-Day Protocol" to unlock Luxury Silk-Screened Applicator',
            initialValue: '90-Day Protocol',
            group: 'general'
        },

        // AMBASSADORS
        {
            name: 'ambassadorQuotes',
            title: 'Ambassador Quotes (Trust Bar)',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'quote',
                        title: 'Quote',
                        type: 'text',
                        rows: 3,
                        validation: Rule => Rule.required()
                    },
                    {
                        name: 'author',
                        title: 'Author Name',
                        type: 'string',
                        validation: Rule => Rule.required()
                    },
                    {
                        name: 'credentials',
                        title: 'Credentials / Field',
                        type: 'string',
                        description: 'e.g. MD, Longevity Specialist'
                    },
                    {
                        name: 'headshot',
                        title: 'Headshot',
                        type: 'image',
                        options: { hotspot: true }
                    }
                ]
            }],
            group: 'ambassadors'
        },

        // TRUST & TRANSPARENCY
        {
            name: 'purityGuaranteeLink',
            title: 'Purity Guarantee Link Text',
            type: 'string',
            initialValue: 'View Batch Results (Third-Party Tested)',
            group: 'trust'
        },
        {
            name: 'labResultsPdf',
            title: 'Lab Results PDF',
            type: 'file',
            options: {
                accept: '.pdf'
            },
            group: 'trust'
        },
        {
            name: 'guaranteeBadgeText',
            title: '90-Day Guarantee Text',
            type: 'string',
            initialValue: '90-Day Guarantee: Feel the Reset or your money back.',
            group: 'trust'
        }
    ],
    preview: {
        prepare() {
            return {
                title: 'Checkout & Cart Settings'
            }
        }
    }
}
