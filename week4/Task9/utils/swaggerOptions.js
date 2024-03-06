// swaggerOptions.js
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for User CRUD Operations',
    version: '1.0.0',
    description: 'This is a REST API application made with Express. It retrieves data from users.',
  },
  servers: [
    {
      url: 'http://localhost:8000', // Adjust the port if your app runs on a different one
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

export default options;
