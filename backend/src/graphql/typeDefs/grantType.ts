import { gql } from 'apollo-server-express';

export const grantType = gql`
  type Grant {
    id: ID!
    foundationName: String!
    grantName: String!
    averageAmount: Float!
    deadline: String!
    location: String!
    areaOfFunding: [String!]!
    status: String!
    matchDate: String!
    feedback: String
  }

  input GrantInput {
    foundationName: String!
    grantName: String!
    averageAmount: Float!
    deadline: String!
    location: String!
    areaOfFunding: [String!]!
    matchDate: String!
    feedback: String
  }

  type Query {
    getGrants: [Grant!]!
    getGrant(id: ID!): Grant
  }

  type Mutation {
    createGrant(grantInput: GrantInput!): Grant!
    updateGrant(id: ID!, grantInput: GrantInput!): Grant
    deleteGrant(id: ID!): Grant
    submitFeedback(id: ID!, feedback: String!, status: String!): Grant
  }
`;
