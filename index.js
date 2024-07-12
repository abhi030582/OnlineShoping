var express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');

var app = express();
app.use(cors());

app.use(express.json({
    extended: true
}));

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
