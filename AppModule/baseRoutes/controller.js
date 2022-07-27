const { jwtVerify } = require('../api/helpers/authHelper')
const closeRoutesController = {
    verifyUser: async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization']
            console.log(authHeader);
            const token = authHeader && authHeader.split(' ')[1]
            console.log("token...", token);

            if (!token) {
                res.json({
                    error: 'Unauthorized to access...'
                })
                return
            }

            const decodedData = await jwtVerify(token)
            console.log(decodedData);
            req.user = decodedData
            next()
        } catch (error) {
            res.json({
                error
            })
            next(error)
            return 
        }
    }
}

module.exports = closeRoutesController


