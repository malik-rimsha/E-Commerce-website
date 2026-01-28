import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from './products'
import orderSchema from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema , orderSchema],
}
