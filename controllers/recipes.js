const { request, response } = require('express');
const Recipe = require('../models/recipe');

const getRecipes = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
   
    const [ total, recipes ] = await Promise.all([
	Recipe.countDocuments(),
	Recipe.find().skip(Number(from)).limit(Number(limit))
    ]);
    
    res.json({
	total,
	recipes
    });
}

const addRecipe = async(req = request, res = response) => {
    const { name, description, ingredients, imagePath} = req.body;
    const recipeDB = await Recipe.findOne({ name, description, ingredients, imagePath});

    if (recipeDB) {
	return res.status(400).json({
	    msg: `La receta ${ recipeDB.name } ya existe`
	})
    }

    const recipe = new Recipe({name, description, ingredients, imagePath});
    await recipe.save();

    res.status(201).json(recipe);
}

module.exports = {
    addRecipe,
    getRecipes
}
