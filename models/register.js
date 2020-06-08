const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    customerID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('customer', registerSchema);
