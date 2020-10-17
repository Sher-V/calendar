import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { Event } from "./resolvers/event";

const PORT = process.env.PORT || 8080;

(async () => {
  await createConnection();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Event],
      validate: false
    }),
  });

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
})();
