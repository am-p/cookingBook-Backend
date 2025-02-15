const { Router } = require('express');
const { check } = require('express-validator');
const { addRecipe, getRecipes } = require('../controllers/recipes');
//const { jwtValidation } = require('../middlewares/jwtValidation');
const { fieldsValidation } = require('../middlewares/fields-validation');

const router = Router();

router.get('/get', getRecipes)

router.post('/add', [
    //jwtValidation,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('ingredients', 'Los ingredientes son obligatorios').not().isEmpty(),
    check('imagePath', 'La imagén es obligatoria').not().isEmpty(),
    fieldsValidation
], addRecipe);

module.exports = router;
