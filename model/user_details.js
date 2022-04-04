const mongoose = require("mongoose");
const user_details = new mongoose.Schema({
    auth_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
        required: true
    },
    first_name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    last_name: {
        type: mongoose.Schema.Types.String
    }
})

module.exports = mongoose.model('user_details', user_details);