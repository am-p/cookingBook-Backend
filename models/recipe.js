const { Schema, model } = require('mongoose');

const RecipeSchema = Schema({
    name: { type: String, required: true },
    description: { type: String },
    ingredients: [
        {
            amount: { type: String, required: true },
            name: { type: String, required: true }
        }
    ],
    imagePath: { type: String },
});

module.exports = model('Recipe', RecipeSchema);
