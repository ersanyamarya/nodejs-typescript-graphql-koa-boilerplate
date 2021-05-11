import mongoose from 'mongoose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'

import Person from './person'
const models = {
  Person,
}

const customizationOptions = {}

const addToSchema = (collection: string, TC): void => {
  collection = collection.toLowerCase()
  schemaComposer.Query.addFields({
    [`${collection}ById`]: TC.mongooseResolvers.findById(),
    [`${collection}ByIds`]: TC.mongooseResolvers.findByIds(),
    [`${collection}One`]: TC.mongooseResolvers.findOne(),
    [`${collection}Many`]: TC.mongooseResolvers.findMany(),
    [`${collection}Count`]: TC.mongooseResolvers.count(),
    [`${collection}Pagination`]: TC.mongooseResolvers.pagination(),
  })

  schemaComposer.Mutation.addFields({
    [`${collection}CreateOne`]: TC.mongooseResolvers.createOne(),
    [`${collection}CreateMany`]: TC.mongooseResolvers.createMany(),
    [`${collection}UpdateById`]: TC.mongooseResolvers.updateById(),
    [`${collection}RemoveById`]: TC.mongooseResolvers.removeById(),
  })
}

for (const name of mongoose.modelNames()) {
  addToSchema(name, composeMongoose(models[name], customizationOptions))
}

export default schemaComposer.buildSchema()
