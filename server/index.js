/*
  express and express-graphql will let us response to HTTP requests
  buildSchema is used to define the types (more soon)
  cors will let us make requests from our Vue app, which will run on port 8080,
  to the server running on port 4000
 */
const express = require('express')
const { graphql, buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

/*
 The next thing to do is define the schema — what types of queries and types the
 server will use. Our first schema is basically the “hello world” of GraphQL:
 */
const schema = buildSchema(`
  type Query {
    language: String
  }
`)
/*
 We define a Query type called language. It returns a String. GraphQL is statically
 typed — fields have types, and if something doesn’t match up, and error is thrown.
 */

/*
 Unlike REST APIs, Graph APIs have just one endpoint, which responds to all requests.
 This is called a resolver. I’ll call mine rootValue, and include the implementation
 for the language query:
 */
const rootValue = {
    language: () => 'GraphQL'
}
/*
 language just returns a String. If we returned a different type, for example 1 or {},
 an error would be thrown, since when we declared language in the schema, we specified
 a String would be returned.
 */
/*
 The last step is to create the express app, and mount the resolver, rootValue , and schema.
 */
const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
    rootValue, schema, graphiql: true
}))

app.listen(4000, () => console.log('Listening on 4000'))
