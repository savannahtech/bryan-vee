import request from 'supertest';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';
import connectDB from '../config';

let app: express.Application;
let server: ApolloServer;

beforeAll(async () => {
    app = express();

    server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });

    await connectDB();
});

afterAll(async () => {
    await server.stop();
});

describe('GraphQL API', () => {
    it('should return a list of grants', async () => {
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
                  query {
                    getGrants {
                      foundationName
                      grantName
                      averageAmount
                      location
                      status
                    }
                  }
                `,
            });

        expect(response.status).toBe(200);
        expect(response.body.data.getGrants).toBeInstanceOf(Array);
    });

    it('should create a new grant', async () => {
        const grantInput = {
            foundationName: 'Test Foundation',
            grantName: 'Test Grant',
            averageAmount: 50000,
            deadline: new Date().toISOString(),
            location: 'Test City',
            areaOfFunding: ['Test Area'],
            matchDate: new Date().toISOString(),
        };

        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
                  mutation {
                    createGrant(grantInput: {
                      foundationName: "${grantInput.foundationName}",
                      grantName: "${grantInput.grantName}",
                      averageAmount: ${grantInput.averageAmount},
                      deadline: "${grantInput.deadline}",
                      location: "${grantInput.location}",
                      areaOfFunding: ["${grantInput.areaOfFunding.join('","')}"],
                      matchDate: "${grantInput.matchDate}"
                    }) {
                      foundationName
                      grantName
                      averageAmount
                    }
                  }
                `,
            });

        expect(response.status).toBe(200);
        expect(response.body.data.createGrant.foundationName).toBe('Test Foundation');
    });
});
