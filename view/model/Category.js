const mongoose = require('mongoose');

const schema = mongoose.Schema;
const CategoriesSchema = new schema({
    category: [{
        name: String,
        image: String,
        subCategory: [{
            name: String,
            image: String,
            subSubCategory: [{
                name: String,
                image: String
            }]
        }]
    }]
});


module.exports = mongoose.model('Category',CategoriesSchema)