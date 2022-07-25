const { existingUserByEmail, passwordEncryption, createUser } = require("../../helpers/userHelper")

const AuthController = {
    signup: async (req, res, next) => {

        try {
            const isUser = await existingUserByEmail(req.body.email)
            if (isUser) {
                res.json({
                    error: 'user already exist'
                })
                return
            }
            
            const password = await passwordEncryption(req.body.password)
            
            const userObject = {
                fullname: req.body.fullname,
                phone: req.body.phone,
                email: req.body.email.toLowerCase(),
                password: password
            };
            
            let result = await createUser(userObject);
            
            delete userObject.password
            
            return res.status(201).json({
                status: 201,
                data: userObject,
                error: null
            })
        } catch (error) {
            next(error)
        }

    }
}

module.exports = AuthController