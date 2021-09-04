import { schemaComposer } from 'graphql-compose'
import mongoose from 'mongoose'
import commonResolvers from './commonResolvers'
import User from './user'

const RESOURCE_SCHEMAS = {
  User,
}

for (const name of mongoose.modelNames()) {
  const model = mongoose.model(name)
  const { queries, mutations, ResourceTC } = RESOURCE_SCHEMAS[name]
  commonResolvers(model, ResourceTC, name, mutations)

  schemaComposer.Query.addFields(queries)
  schemaComposer.Mutation.addFields(mutations)
}

export default schemaComposer.buildSchema()
