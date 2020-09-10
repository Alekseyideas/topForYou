import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/global/User';

export default async function createServer(app: Application) {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
    // formatError: (error: GraphQLError) => {
    //   // Don't give the specific errors to the client.
    //   if (error.message.startsWith('Database Error: ')) {
    //     return new Error('Internal server error');
    //   }

    //   if (!error.originalError) return error;
    //   const message = error.message;
    //   const originalError: IErrorResponse = error.originalError;
    //   const statusCode = originalError.code || 500;
    //   // Otherwise return the original error.  The error can also
    //   // be manipulated in other ways, so long as it's returned.
    //   return {
    //     message: message,
    //     statusCode,
    //   };
    // },
  });

  server.applyMiddleware({ app, cors: false });
  return server;
}
