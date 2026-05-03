export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    readOnly: true, // Orders are created via Stripe webhooks only
    fields: [
        {
            name: 'orderNumber',
            title: 'Order Number',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'stripeSessionId',
            title: 'Stripe Session ID',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'stripePaymentIntentId',
            title: 'Stripe Payment Intent ID',
            type: 'string'
        },
        {
            name: 'status',
            title: 'Order Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Processing', value: 'processing' },
                    { title: 'Shipped', value: 'shipped' },
                    { title: 'Delivered', value: 'delivered' },
                    { title: 'Cancelled', value: 'cancelled' },
                    { title: 'Refunded', value: 'refunded' },
                ],
                layout: 'dropdown'
            },
            initialValue: 'pending'
        },
        {
            name: 'customer',
            title: 'Customer',
            type: 'object',
            fields: [
                {
                    name: 'email',
                    title: 'Email',
                    type: 'string'
                },
                {
                    name: 'name',
                    title: 'Name',
                    type: 'string'
                },
                {
                    name: 'phone',
                    title: 'Phone',
                    type: 'string'
                }
            ]
        },
        {
            name: 'shippingAddress',
            title: 'Shipping Address',
            type: 'object',
            fields: [
                { name: 'line1', title: 'Address Line 1', type: 'string' },
                { name: 'line2', title: 'Address Line 2', type: 'string' },
                { name: 'city', title: 'City', type: 'string' },
                { name: 'state', title: 'State/Province', type: 'string' },
                { name: 'postalCode', title: 'Postal Code', type: 'string' },
                { name: 'country', title: 'Country', type: 'string' }
            ]
        },
        {
            name: 'items',
            title: 'Order Items',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'productId',
                        title: 'Product',
                        type: 'reference',
                        to: [{ type: 'product' }]
                    },
                    {
                        name: 'name',
                        title: 'Product Name',
                        type: 'string'
                    },
                    {
                        name: 'variant',
                        title: 'Variant',
                        type: 'string'
                    },
                    {
                        name: 'quantity',
                        title: 'Quantity',
                        type: 'number'
                    },
                    {
                        name: 'price',
                        title: 'Price',
                        type: 'number'
                    }
                ]
            }]
        },
        {
            name: 'subtotal',
            title: 'Subtotal',
            type: 'number'
        },
        {
            name: 'shippingCost',
            title: 'Shipping Cost',
            type: 'number'
        },
        {
            name: 'tax',
            title: 'Tax',
            type: 'number'
        },
        {
            name: 'total',
            title: 'Total',
            type: 'number'
        },
        {
            name: 'currency',
            title: 'Currency',
            type: 'string',
            initialValue: 'usd'
        },
        {
            name: 'trackingNumber',
            title: 'Tracking Number',
            type: 'string'
        },
        {
            name: 'trackingUrl',
            title: 'Tracking URL',
            type: 'url'
        },
        {
            name: 'notes',
            title: 'Internal Notes',
            type: 'text',
            rows: 3
        },
        {
            name: 'createdAt',
            title: 'Order Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        }
    ],
    preview: {
        select: {
            orderNumber: 'orderNumber',
            customerEmail: 'customer.email',
            total: 'total',
            status: 'status'
        },
        prepare({ orderNumber, customerEmail, total, status }) {
            return {
                title: `Order #${orderNumber}`,
                subtitle: `${customerEmail} • $${total} • ${status?.toUpperCase()}`
            }
        }
    },
    orderings: [
        {
            title: 'Order Date (Newest First)',
            name: 'createdAtDesc',
            by: [
                { field: 'createdAt', direction: 'desc' }
            ]
        },
        {
            title: 'Order Date (Oldest First)',
            name: 'createdAtAsc',
            by: [
                { field: 'createdAt', direction: 'asc' }
            ]
        }
    ]
}
