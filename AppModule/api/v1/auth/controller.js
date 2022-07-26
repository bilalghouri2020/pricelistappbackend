const { existingUserByPhoneNumber, passwordEncryption, createUser } = require("../../helpers/userHelper")

const AuthController = {
    signup: async (req, res, next) => {

        try {
            const isUser = await existingUserByPhoneNumber(req.body.phone)
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
                company: req.body.company,
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