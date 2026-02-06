import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import consultancy from './consultancy'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, consultancy], 
}