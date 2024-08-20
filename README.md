# Grants Dashboard

This is the Grants Dashboard Fullstack app.

### Installation

1.  **Clone the Repository**:
    ```
    git clone https://github.com/savannahtech/bryan-vee.git
    ```
    
## Backend
This is the backend service for the Grants Dashboard application. The backend is built using Node.js, TypeScript, and GraphQL, with MongoDB as the database. It provides a GraphQL API for managing grant opportunities and feedback.

### Features
-   **GraphQL API**: Provides a flexible and efficient API for managing grants.
-   **TypeScript**: Ensures type safety and enhances code quality.
-   **MongoDB**: Used as the persistent storage for grants data.
-   **Docker Compose**: Manages the backend and MongoDB services in separate containers.
-   **Testing**: Includes unit and integration tests using Jest and Supertest.

### Project Structure
```
├── Dockerfile
├── README.md
├── docker-compose.yml
├── jest.config.js
├── jest.setup.ts
├── package-lock.json
├── package.json
├── src
│   ├── config
│   │   └── index.ts
│   ├── graphql
│   │   ├── resolvers
│   │   │   ├── grantResolvers.ts
│   │   │   └── index.ts
│   │   └── typeDefs
│   │       ├── grantType.ts
│   │       └── index.ts
│   ├── index.ts
│   ├── models
│   │   └── Grant.ts
│   ├── services
│   │   └── grantService.ts
│   └── tests
│       ├── grantService.test.ts
│       └── resolvers.test.ts
├── structure.txt
└── tsconfig.json
```

### Prerequisites

Before you begin, ensure you have met the following requirements:

-   **Docker**: Installed and running
-   **Docker Compose**: Installed and running

### Installation

1.  **Open Backend Directory**:
    ```
    cd backend
    ```


### Running the Backend

#### Using Docker Compose

To run the backend and MongoDB services using Docker Compose:

1.  **Start the Services**:

    ```
    docker-compose up -d 
    ```

    This command will start both the backend and MongoDB services in the background.

2.  **Access the Backend API**:

    The backend service will be available at `http://localhost:4000/graphql`.


#### Stopping the Services

To stop the services, run:

```
docker-compose down 
```

This will stop and remove the containers for both the backend and MongoDB services.

#### Running locally

To run the backend locally, ensure you have MongoDB installed on your machine:

1.  **Set Up Environment Variables**:

    Create a `.env` file in the backend directory and add the following:
    ```
    MONGO_URI=mongodb://localhost:27017/grants-dashboard
    PORT=4000
    ```
    
2.  **Install Packages**:
    ```
    npm install
    ```

    This command will start the backend server.

3.  **Start the Server**:

    ```
    npm start
    ```

    This command will start the backend server.

4.  **Access the Backend API**:

    The backend service will be available at `http://localhost:4000/graphql`.


### Running Tests

To run the tests, run:
    ```
    npm test
    ```
### API Documentation

The backend exposes a GraphQL API. You can explore and test the API using a tool like [GraphQL Playground](https://github.com/graphql/graphql-playground) or Postman.

#### Example Queries and Mutations

-   **Get All Grants**:

    ```
    query {
        getGrants {
            id
            foundationName
            grantName
            averageAmount
            location
            areaOfFunding
            status
            matchDate
            deadline
        }
    }
    ```

-   **Create a Grant**:

    ```
    mutation {
        createGrant(
            grantInput: {
                foundationName: "Test Foundation",
                grantName: "Test Grant",
                averageAmount: 100000,
                location: "Test City",
                areaOfFunding: ["Education"],
                matchDate: "2024-01-01",
                deadline: "2024-01-31"
            }
        ) {
            id
            foundationName
            grantName
        }
    }
    ```

-   **Update a Grant**:

    ```
    mutation {
        updateGrant(
            id: "grant_id", 
            grantInput: {
                foundationName: "Updated Foundation",
                grantName: "Updated Grant",
                averageAmount: 150000,
                location: "Updated City",
                areaOfFunding: ["Research"],
                matchDate: "2024-02-01",
                deadline: "2024-02-28"
            }
        ) {
            id
            foundationName
            grantName
        }
    }
    ```

-   **Delete a Grant**:

    ```
    mutation {
        deleteGrant(
            id: "grant_id"
        ) {
            id
            foundationName
        }
    }
    ```

-   **Submit Feedback**:
    ```
    mutation {
        submitFeedback(
            id: "grant_id", 
            feedback: "This is my feedback", 
            status: "Accepted"
        ) {
            id
            status
            feedback
        }
    }
    ```


## Frontend
This is the frontend of the Grants Dashboard application, built using React.js and TypeScript. The frontend allows users to view grant opportunities, submit feedback on these opportunities, and interact with the application through a user-friendly interface.

### Features

-   **Responsive Design**: The interface is designed to work well on both desktop and mobile devices.
-   **User Interactions**: Users can submit feedback on grant opportunities via a modal that appears when clicking thumbs-up or thumbs-down.
-   **State Management**: Global state is managed using React Context and custom hooks.

### Project Structure

```
.
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── logo.jpeg
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── FeedbackModal.tsx
│   │   ├── GrantOpportunitiesTable.tsx
│   │   ├── GrantTableRow.tsx
│   │   ├── HeaderSection.tsx
│   │   ├── MatchesCard.tsx
│   │   └── shadcn-ui
│   │       ├── menubar.tsx
│   │       └── popover.tsx
│   ├── hooks
│   │   └── useGrants.ts
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── services
│   │   └── api.ts
│   ├── utils
│   │   └── helpers.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Installation

1.  **Open Frontend Directory:**

    ```
        cd frontend
    ```
2.  **Set Up Environment Variables**:

    Create a `.env` file in the frontend directory and add the following:
    ```
    VITE_API_URL=http://localhost:4000/graphql
    ```
3. **Install dependencies:**

    ```
    npm install
    ```

### Usage

1.  **Start the development server:**

    ```
    npm start
    ```
2.  **Access the application in your browser:**

    ```
    http://localhost:5173
    ```
    The frontend will connect to the backend API at the configured GraphQL endpoint.

### Technologies Used

-   **Frontend**: React.js, TypeScript, CSS Modules
-   **State Management**: React Context API, Custom Hooks
-   **Styling**: CSS Modules

## Running Frontend and Backend Simultaneously
o run both the frontend and backend of the Grants Dashboard simultaneously:
1. Follow the steps highlighted in the previous sections to start both the backend and the frontend.
2. Access the application:
   - Frontend: Open your browser and go to http://localhost:5173 to interact with the frontend.
   - Backend: The backend GraphQL API will be running at http://localhost:4000/graphql.
3. In order to properly test the frontend, run this curl script in your terminal a few times in order to populate the database. Ensure You have the backend running.
    ```
    curl -X POST http://localhost:4000/graphql \
    -H "Content-Type: application/json" \
    -d '{
    "query": "mutation { createGrant(grantInput: { foundationName: \"Test Foundation\", grantName: \"Test Grant\", averageAmount: 100000, location: \"Test City\", areaOfFunding: [\"Education\"], matchDate: \"2024-01-01\", deadline: \"2024-01-31\" }) { id foundationName grantName averageAmount location areaOfFunding matchDate deadline status } }"
    }'
    ```



## Future Improvements

While the current implementation of the Grants Dashboard meets the core requirements, there are several enhancements that could be made to further improve the application’s performance, scalability, and maintainability. Given more time, the following improvements would be considered:

### Frontend Enhancements

1.  **Complex State Management with `useReducer`**:

    -   For more complex state management scenarios, particularly when multiple state variables are interdependent, the use of `useReducer` would provide a more predictable and scalable way to manage state.
2.  **Implement Caching**:

    -   To optimize performance, caching could be introduced at various levels (e.g., browser cache, service worker cache, or even application-level caching) to avoid redundant API calls and improve the user experience, especially in scenarios with limited network availability.
3.  **Implement Pagination**:

    -   For large datasets, such as grant opportunities, implementing pagination would enhance performance and usability by reducing the amount of data loaded at once and providing users with a more navigable interface.

### Backend Enhancements

1.  **Rate Limiting**:

    -   To prevent abuse and ensure fair usage of the API, implementing a rate limiter would be essential. This would limit the number of requests a user can make within a certain timeframe, protecting the server from overload.
2.  **Graceful Shutdown**:

    -   Implementing a graceful shutdown mechanism would ensure that the server properly handles ongoing requests and cleanly disconnects from resources like databases before shutting down, which is crucial for maintaining data integrity and minimizing downtime.
3.  **Logging**:

    -   Introducing a robust logging system would provide better insights into the application's behavior, help in debugging issues, and monitor performance. Logging would also be crucial for auditing and maintaining security compliance.
4.  **Dependency Injection**:

    -   The business logic will not necessarily depend on the Database layer.

### Additional Considerations

-   **Optimizing the Docker Setup**:

    -   Further optimization of the Docker setup could be done to reduce build times and improve the efficiency of the development environment.
-   **Security Enhancements**:

    -   Implementing security best practices, such as HTTPS, secure cookies, and environment-based configurations, would further secure the application against common vulnerabilities.
-   **Testing Improvements**:

    -   Expanding the test coverage to include integration tests and end-to-end tests would increase the reliability of the application and ensure that all components work together as expected.
