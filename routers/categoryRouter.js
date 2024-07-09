const express = require("express");
const router = express.Router();
const Category = require('../models/Catogory');

router.get('/category', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

router.post('/category', async (req, res) => {
    
    try {
        const categories = await new Category(req.body);
        await categories.save();
        res.status(201).json({
            success: true,
            categories
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;