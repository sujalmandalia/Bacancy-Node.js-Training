// swaggerConfig.js
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'User API',
    description: 'API for managing users',
  },
  host: 'localhost:8000',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/userRoutes.js'];

// Note: Since swaggerAutogen() returns a promise, we export an async function to run it
export default async function generateSwaggerDocs() {
  await swaggerAutogen()(outputFile, endpointsFiles, doc);
}
