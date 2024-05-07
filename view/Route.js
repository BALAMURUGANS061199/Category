const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const schema = mongoose.Schema;
const CategoriesSchema = new schema({
    Category1: [{
        name: String,
        image: String,
        Category2: [{
            name: String,
            image: String,
            Category3: [{
                name: String,
                image: String
            }]
        }]
    }]
});

const CategoryModel = mongoose.model('Categories', CategoriesSchema);


router.post('/Upload', async (req, res) => {
    const categoriesData = req.body.categories; // Assuming the request body contains an array of categories

    try {
        // Fetch the existing categories model if it exists
        let existingCategories = await CategoryModel.findOne();

        if (!existingCategories) {
            // If the categories don't exist, create a new categories object
            existingCategories = new CategoryModel({ Category1: [] });
        }

        // Map over each category in the request body and insert into the Category1 array
        categoriesData.forEach((categoryData) => {
            const { name, imageUrl, subCategories } = categoryData;
            const categoryObject = {
                name: name,
                image: imageUrl,
                Category2: []
            };

            // Map over each subcategory in the categoryData and insert into the Category2 array
            subCategories.forEach((subCategoryData) => {
                const { name: subCategoryName, imageUrl: subCategoryImageUrl, subSubCategories } = subCategoryData;
                const subCategoryObject = {
                    name: subCategoryName,
                    image: subCategoryImageUrl,
                    Category3: []
                };

                // Map over each subsubcategory in the subCategoryData and insert into the Category3 array
                subSubCategories.forEach((subSubCategoryData) => {
                    const { name: subSubCategoryName, imageUrl: subSubCategoryImageUrl } = subSubCategoryData;
                    subCategoryObject.Category3.push({
                        name: subSubCategoryName,
                        image: subSubCategoryImageUrl
                    });
                });

                categoryObject.Category2.push(subCategoryObject);
            });

            existingCategories.Category1.push(categoryObject);
        });

        // Save/update the categories in the database
        const savedCategories = await existingCategories.save();
        res.status(201).json(savedCategories);
    } catch (error) {
        console.error('Error uploading categories and inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
