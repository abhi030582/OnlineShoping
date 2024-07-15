var express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


var app = express();
app.use(cors());

app.use(express.json({
    extended: true
}));

const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'Shopping Cart Api Documentation',
          version: '1.0.1',
          description: 'API documentations For Backend of Shoping cart ',
      },
      servers: [
          {
              url: `http://localhost:${process.env.PORT}`,
              description: 'Local development server',
          },
      ],
  },
  apis: ['./routers/categoryRouter.js', './routers/productRouter.js','./routers/userRouter.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.log(error.red));
db.once('open', () => console.log("Connected to Database".green.underline.bold));

//API's
app.use('/api/v1/product', require('./routers/productRouter'));
app.use('/api/v1', require('./routers/categoryRouter'));
app.use('/api/v1', require('./routers/userRouter'));
app.use('/api/v1/order', require('./routers/orderRouter'));

let server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
