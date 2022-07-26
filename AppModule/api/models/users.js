const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    company: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        select: false
    }

},
    { timestamps: true }
)
const UserModel= mongoose.model("users", userSchema)
exports.UserModel = UserModel