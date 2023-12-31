const express = require('express');
const app = express();
const pool = require('./db'); // Adjust the path if needed.
const cors = require('cors');
require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation options
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Documentation',
        version: '1.0.0',
        description: 'A sample API documentation',
      },
      servers: [
        {
          url: 'http://localhost:3001', // Replace with your server URL
        },
      ],
    },
    apis: ['index.js', 'routes/inventory.js'], // Replace with the path to your server file (index.js in this case)
  };
  
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define a simple route to respond with "Hello, world!".
/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Returns a hello message
 *     responses:
 *       200:
 *         description: A successful response
 */
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use("/user", require("./user/controller/UserController.js"));
app.use("/about", require("./about/controller/AboutController"));
app.use("/service", require("./services/controller/ServiceController"));
app.use("/project", require("./projects/controller/ProjectController"));
app.use("/contacts", require("./contacts/controller/ContactsController"))

// Start the server on a specific port (e.g., 3000).
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
