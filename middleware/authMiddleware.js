const User = require("../Models/User")

exports.binduserWithMiddleware = () => {

    return async(req, res, next) => {
        if (!req.body.isloggedIn) {
            return next()
        }
        try {
            let user = await User.findById(req.session.user_id)
            req.user = user
            next()
        } catch (e) {
            console.log(e)
        }
    }
}


exports.isAuthenticate = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect("/auth/login")
    }
    next()
}
exports.isUnAuthenticate = (req, res, next) => {
    if (req.session.isloggedIn) {
        return res.redirect("/dashboard")
    }
    next()
}