import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { Meeting } from "./resolvers/meetings";

const PORT = process.env.PORT || 8080;

(async () => {
  let retries = 5;

  while (retries) {
    try {
      await createConnection();
      break;
    } catch (e) {
      console.log(e);
      retries--;
      console.log(`${retries} retries left.`);
      // wait for 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Meeting],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
})();
