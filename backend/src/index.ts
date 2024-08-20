import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import connectDB from './config';
import cors from 'cors';
import { config } from 'dotenv';

// Load environment variables
config();

/**
 * Sets up and returns an initialized Apollo Server instance.
 * @returns {ApolloServer} - An initialized Apollo Server instance.
 */
const createApolloServer = (): ApolloServer => {
    return new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ authHeader: req.headers.authorization }),
        persistedQueries: false
    });
};

/**
 * Sets up the Express server with necessary middleware.
 * @param {express.Application} app - The Express application instance.
 */
const setupMiddleware = (app: express.Application) => {
    // Apply CORS middleware
    app.use(cors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
    }));
};

/**
 * Starts the Express server with Apollo GraphQL middleware.
 */
const startServer = async () => {
    const app = express();

    try {
        // Set up middleware
        setupMiddleware(app);

        // Initialize Apollo Server
        const server = createApolloServer();
        await server.start();
        server.applyMiddleware({ app });
        console.log('Apollo Server initialized');

        // Connect to the MongoDB database
        await connectDB();
        console.log('Connected to MongoDB');

        const PORT = process.env.PORT || 4000;
        const serverInstance = app.listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        });

        // Graceful shutdown
        const shutdown = () => {
            console.log('Shutting down gracefully...');
            serverInstance.close(() => {
                console.log('HTTP server closed');
                process.exit(0);
            });
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);

    } catch (error) {
        console.error('Failed to start server:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

// Start the server
startServer();
