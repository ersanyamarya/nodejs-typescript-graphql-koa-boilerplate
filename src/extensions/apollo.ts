import { ApolloServer, gql } from 'apollo-server-koa'

export default (): ApolloServer => {
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `

  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  }

  return new ApolloServer({
    debug: true,
    playground: true,
    tracing: true,
    resolvers,
    typeDefs,
  })
}
