const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 30
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 320
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100
    },
    member: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('User', UserSchema);