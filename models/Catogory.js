const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
     description: {
        type: String,
        required: [true, 'Please enter  description']
    }
});

module.exports = mongoose.model('Category', categorySchema);
