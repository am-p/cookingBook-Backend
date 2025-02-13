const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt-generator');

const login = async(req, res = response) => {
    const { mail, password } = req.body;

    try {
	const user = await User.findOne({ mail });
	if (!user) {
	    return res.status(400).json({
		msg: 'User / Password no son correctos - mail '
	    });
	}

	if (!user.state) {
	    return res.status(400).json({
		msg: 'User / Password no son correctos - estado: false '
	    });
	}

	const validPassword = bcryptjs.compareSync( password, user.password );
	if (!validPassword) {
	    return res.status(400).json({
		msg: 'User / Password no son correctos - password'
	    });
	}
	
	const token = await generarJWT( user.id );
	
	res.json({
	    user,
	    token
	});
    } catch(error) {
	console.log(error);
	res.status(500).json({
	    msg: 'Hable con el administrador' 
	});
    };
};


module.exports = {
    login
};
