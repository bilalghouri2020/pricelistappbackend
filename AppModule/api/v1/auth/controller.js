const { existingUserByPhoneNumber, passwordEncryption, createUser } = require("../../helpers/userHelper")
const jwt = require('jsonwebtoken')
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
            return
        } catch (error) {
            next(error)
            return
        }
    },
    login: async (req, res, next) => {
        try {
            const { phone, password } = req.body
            const user = await existingUserByPhoneNumber(phone)
            if (!user) {
                res.json({
                    error: 'this user is not avaliable...'
                })
            }
            const hashedPassword = await passwordEncryption(password)
            
            if (user.password !== hashedPassword) {
                console.log(user.password);
                console.log(hashedPassword);
                res.json({
                    error: 'phone number and password is incorrect...'
                })
                return
            }
            const payload = {
                _id: user._id,
                phone: user.phone,
                company: user.company
            }
            const jwtToken = jwt.sign(payload, process.env.SECRET_KEY)
            console.log("you are successfully login.");
            res.json({
                data: { "token": jwtToken },
            });
        } catch (error) {
            next(error)
        }

    }
}

module.exports = AuthController