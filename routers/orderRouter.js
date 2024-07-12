const express = require("express");
const router = express.Router();
const User = require('../models/User');
const ProductModel = require('../models/ProductModel');
const Order = require('../models/orderModel');
const jwt = require('jsonwebtoken');

router.post('/', async(req, res) => {
    try
    {
        const token = req.header('Authorization');
        const decode = jwt.verify(token,process.env.JWT_KEY);
        const user = await User.findOne({email:decode.email});
       
        const newOrder = new Order({
            userId: user._id,
            products: req.body.products,
            description: req.body.description,
            status: 'created'
        });
        const order = await newOrder.save();
        updateProduct(order.products);
        res.status(200).json({
            success: true,
            order: order
        });
    }  
    catch(error)
    {
        res.status(401).json({
            status:false,
            message:error
        });
    } 
});

const updateProduct = async(products)=>{
console.log(products);
for (let product of products) {
    try {
        let prd = await ProductModel.findById(product.productId);
        console.log(prd);
        let total = prd.stock;
        prd.stock = total - product.quantity;
        console.log(prd);
        await ProductModel.findByIdAndUpdate(product.productId, prd, { new: true, runValidators: true });

    } catch (error) {
        console.log(error);
    }

}


}


module.exports = router;