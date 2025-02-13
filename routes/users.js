const { Router } = require('express');
const { usersGet, usersPost} = require('../controllers/users');
const { check } = require('express-validator');
const { emailExist } = require('../helpers/db-validators');
const { fieldsValidation } = require('../middlewares/fields-validation');

const router = Router();

router.get('/', usersGet);

router.post('/signup', [
    check('password', 'El password debe ser de mas 6 letras').isLength({ min:6 }),
    check('mail').custom(emailExist),
    fieldsValidation
],  usersPost);

module.exports = router;

