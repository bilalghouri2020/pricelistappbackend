const Joi = require('joi');

// const { ErrorHandler } = require("../../helpers/errorHandler");

exports.ValidateSignUp = (req, res, next) => {
    try {
        const schema = Joi.object({
            fullname: Joi.string().required().min(3).max(30),
            phone: Joi.string().required().min(11).max(16),
            company: Joi.string().required().min(3).max(30),
            password: Joi.string().required().min(6).max(30)
        })
        const { error } = schema.validate(req.body)
        
        if (error){
            console.log(error);
            res.json({
                error: error
            })
            return 
        }
        next()
    } catch (error) {
        next(error);
    }
}

exports.ValidateLogin = (req, res, next) => {
    try {
        
        const schema = Joi.object({
            phone: Joi.string().required(),
            password: Joi.string().required()
        })
        const {error} = schema.validate(req.body)
        if(error) {
            res.json({
                error: 'ok'
            })
            return
        }
        next()

    } catch (error) {
        next(error)
    }
}