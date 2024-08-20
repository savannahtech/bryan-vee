import {ApolloClient, createHttpLink, gql, InMemoryCache} from '@apollo/client';

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
    console.error('The REACT_APP_API_URL environment variable is not defined.');
    throw new Error('REACT_APP_API_URL environment variable is not defined');
}

const client = new ApolloClient({
    link: createHttpLink({ uri: apiUrl }),
    cache: new InMemoryCache(),
});

export const getGrants = async () => {
    const { data } = await client.query({
        query: gql`
      query GetGrants {
        getGrants {
          id
          foundationName
          grantName
          averageAmount
          location
          matchDate
          deadline
          status
        }
      }
    `,
    });
    return data.getGrants;
};

export const submitFeedback = async (id: string, feedback: string, isPositive: boolean) => {
    const status = isPositive ? "Accepted" : "Rejected"
    const mutation = gql`
          mutation submitFeedback($id: ID!, $feedback: String!, $status: String!) {
            submitFeedback(id: $id, feedback: $feedback, status: $status) {
              id
              status
              feedback
            }
          }
        `;

    const {data} = await client.mutate({
        mutation,
        variables: { id, feedback, status },
    });

    return data.submitFeedback;
};