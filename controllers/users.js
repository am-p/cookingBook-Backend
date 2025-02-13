const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = {state:true};
   
    const [ total, users ] = await Promise.all([
	User.countDocuments(query),
	User.find(query).skip(Number(from)).limit(Number(limit))
    ]);
    
    res.json({
	total,
	users
    });
};

const usersPost = async(req, res = response) => {
    const { name, mail, password, role } = req.body;
    const user = new User({ name, mail, password, role });   
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.json({
	user
    });
};

module.exports = {
    usersGet,
    usersPost
}
