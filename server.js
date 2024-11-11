const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

//curl --request POST --header 'content-type: application/json' --url 'http://localhost:4000/graphql' --data '{"query":"hello {}"}'

// Define a simple GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, World...",
  },
};

const startServer = async () => {
  // Create an Express app
  const app = express();

  // Set up ApolloServer
  const server = new ApolloServer({ typeDefs, resolvers });

  // Wait for the server to start (this is the correct place for await)
  await server.start();

  // Apply Apollo middleware to the Express app
  server.applyMiddleware({ app });

  // Set up the server to listen on a port
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(
      `Server is running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

// Start the server
startServer();
