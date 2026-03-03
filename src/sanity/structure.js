export const structure = (S) =>
    S.list()
        .title('Aurabio CMS')
        .items([
            // PRODUCTS SECTION
            S.listItem()
                .title('Products')
                .icon(() => '🧴')
                .child(
                    S.list()
                        .title('Products')
                        .items([
                            S.listItem()
                                .title('All Products')
                                .schemaType('product')
                                .child(S.documentTypeList('product').title('All Products')),
                            S.divider(),
                            S.listItem()
                                .title('Active Products')
                                .schemaType('product')
                                .child(
                                    S.documentList()
                                        .title('Active Products')
                                        .filter('_type == "product" && status == "active"')
                                ),
                            S.listItem()
                                .title('Draft Products')
                                .schemaType('product')
                                .child(
                                    S.documentList()
                                        .title('Draft Products')
                                        .filter('_type == "product" && status == "draft"')
                                ),
                            S.listItem()
                                .title('Featured Products')
                                .schemaType('product')
                                .child(
                                    S.documentList()
                                        .title('Featured Products')
                                        .filter('_type == "product" && featured == true')
                                ),
                        ])
                ),

            // COLLECTIONS SECTION
            S.listItem()
                .title('Collections')
                .icon(() => '📦')
                .schemaType('collection')
                .child(S.documentTypeList('collection').title('Collections')),

            S.divider(),

            // ORDERS SECTION
            S.listItem()
                .title('Orders')
                .icon(() => '📋')
                .child(
                    S.list()
                        .title('Orders')
                        .items([
                            S.listItem()
                                .title('All Orders')
                                .schemaType('order')
                                .child(
                                    S.documentList()
                                        .title('All Orders')
                                        .filter('_type == "order"')
                                        .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
                                ),
                            S.divider(),
                            S.listItem()
                                .title('Processing Orders')
                                .schemaType('order')
                                .child(
                                    S.documentList()
                                        .title('Processing Orders')
                                        .filter('_type == "order" && status == "processing"')
                                        .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
                                ),
                            S.listItem()
                                .title('Shipped Orders')
                                .schemaType('order')
                                .child(
                                    S.documentList()
                                        .title('Shipped Orders')
                                        .filter('_type == "order" && status == "shipped"')
                                        .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
                                ),
                            S.listItem()
                                .title('Delivered Orders')
                                .schemaType('order')
                                .child(
                                    S.documentList()
                                        .title('Delivered Orders')
                                        .filter('_type == "order" && status == "delivered"')
                                        .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
                                ),
                        ])
                ),

            S.divider(),

            // CONTENT SECTION
            S.listItem()
                .title('Content')
                .icon(() => '📝')
                .child(
                    S.list()
                        .title('Content')
                        .items([
                            S.listItem()
                                .title('Homepage')
                                .icon(() => '🏠')
                                .child(
                                    S.document()
                                        .schemaType('homepage')
                                        .documentId('homepage')
                                ),
                            S.listItem()
                                .title('Journal / Blog')
                                .icon(() => '📖')
                                .schemaType('journal')
                                .child(S.documentTypeList('journal').title('Journal Articles')),
                        ])
                ),

            S.divider(),

            // SETTINGS SECTION
            S.listItem()
                .title('Site Settings')
                .icon(() => '⚙️')
                .child(
                    S.document()
                        .schemaType('settings')
                        .documentId('settings')
                ),
        ])
