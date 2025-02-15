const { request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtValidation = async( req = request, res, next) => {
    const token = req.header('x-token') || req.query.auth;
    console.log(token);
    if (!token) {
	return res.status(401).json({
	    msg: 'No hay token en la peticion'
	});
    };
    try {
	const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
	const user = await User.findById(uid);
	if (!user) {
	    return res.status(401).json({
		msg: 'Token no valido - usuario no existe en DB'
	    });
	}
	if (!user.state) {
	    return res.status(401).json({
		msg: 'Token no valido - usuario con estado: false'
	    });
	}
	req.user = user;
	next();
    } catch(error) {
	console.log(error);
	res.status(401).json({
	    msg: 'Token no valido'
	});
    };

};

module.exports = {
    jwtValidation
};
