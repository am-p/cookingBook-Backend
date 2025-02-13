const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { fieldsValidation } = require('../middlewares/fields-validation');

const router = Router();

router.post('/login', [
    check('mail', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasenia es obligatoria').not().isEmpty(),
    fieldsValidation
], login);

module.exports = router;
