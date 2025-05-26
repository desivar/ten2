const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json'; // Where the generated JSON will be saved
const endpointsFiles = ['./server.js']; // Point to server.js or your main route file

const doc = {
  info: {
    title: 'Tennis API',
    description: 'API for managing tennis players and tournaments',
  },
  host: 'localhost:5500', // Your server host and port
  basePath: '/api', // The base path for all your API routes (e.g., /api/players)
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Players',
      description: 'Endpoints related to tennis players',
    },
    {
      name: 'Tournaments',
      description: 'Endpoints related to tennis tournaments',
    },
  ],
  definitions: {
    // You can define reusable schemas here if needed, but autogen often infers them
    // Example:
    // Player: {
    //   name: 'string',
    //   age: 0,
    //   ranking: 0,
    //   country: 'string',
    //   titles: 0,
    //   matchesPlayed: 0,
    //   winPercentage: 0.0
    // }
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server'); // This starts your server after the doc is generated
});