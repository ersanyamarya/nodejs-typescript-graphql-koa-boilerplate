import { ObjectTypeComposerWithMongooseResolvers } from 'graphql-compose-mongoose'
import { Model } from 'mongoose'

export default function customResolvers(
  model: Model<any>,
  TC: ObjectTypeComposerWithMongooseResolvers<any, any>,
  name: string,
  mutations: Record<string, any>
): any {
  TC.addResolver({
    name: 'removeAll',
    type: 'Boolean',
    resolve: async () => {
      await model.deleteMany({}).catch(err => {
        console.log(err)
        return false
      })
      return true
    },
  })
  mutations[`${name.toLowerCase()}RemoveAll`] = TC.getResolver('removeAll')
}
