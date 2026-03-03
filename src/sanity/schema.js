import product from './schemas/product'
import homepage from './schemas/homepage'
import journal from './schemas/journal'
import collection from './schemas/collection'
import settings from './schemas/settings'
import order from './schemas/order'
import legal from './schemas/legal'

export const schema = {
    types: [product, collection, homepage, journal, settings, order, legal],
}
