const { UserModel } = require('../models/users')
const crypto = require('crypto')


exports.createUser = async (object) => {
    try {
        const user = await new UserModel(object)
        await user.save()
        return user
    } catch (error) {
        return null
    }
}
exports.existingUserByEmail = async (email) =>  {
    try {
        const user = await UserModel.findOne({email: email}).lean().select("+password").exec();
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}

exports.passwordEncryption = async (password) => {
    try {
        const algorithm = process.env.ENCRYPTION_ALGORITHM
        const cipher = crypto.createHash(algorithm)
        const encrypted = cipher.update(password).digest('hex')
        return encrypted
    } catch (error) {
        return error
    }
}