const User = require('../models/user');

const emailExist = async( mail = '') => {
    const mailExist = await User.findOne({ mail });
    if (mailExist) {
     	throw new Error(`El correo ${ mail } ya existe en la BD`);
     }
};

module.exports = {
    emailExist
}
