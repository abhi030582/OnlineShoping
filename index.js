var express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

var app = express();

app.use(express.json({
    extended: true
}));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.log(error.red));
db.once('open', () => console.log("Connected to Database".green.underline.bold));

//API's
app.get("/health", (req, res) => {
    res.send("Shoping Cart Application Running");
});

app.use('/api/v1/product', require('./routers/productRouter'));


let server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
