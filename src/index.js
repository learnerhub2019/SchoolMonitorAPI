// Global Imports
const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
// Local import
const connectMongodb = require("./startup/db");
const { PORT } = require("./startup/config");
const routes = require("./startup/routes");
const logger = require("./startup/logger");

const initServer = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  await connectMongodb();
  routes(app);
  logger();

  app.listen({ port: PORT }, () =>
    console.log(`Api app running on http://localhost:${PORT}`)
  );
};

initServer();

// OLD CODE
// const { ApolloServer, gql } = require( "apollo-server-express" )
// import { typeDefs, resolvers } from "./module/user"
// import { UserModel } from './models/user.model'

// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// });

// server.applyMiddleware({ app });
