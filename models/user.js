const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
    },
    mail: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    role: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true
    },
});

// UserSchema.methods.toJSON = function() { 
//     const { __v, password , _id, ...user } = this.toObject();
//     user.uid = _id;
//     return user;
// };

module.exports = model('User', UserSchema);
