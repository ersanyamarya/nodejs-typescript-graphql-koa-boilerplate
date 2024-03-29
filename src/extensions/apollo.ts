import { ApolloServer } from 'apollo-server-koa'
import schema from '../resources'

export default (): ApolloServer => {
  return new ApolloServer({
    debug: true,
    schema,
  })
}
