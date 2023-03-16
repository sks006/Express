module.exports = () => {

    return async(req, res, next) => {
        res.locals.user = req.user
        res.locals.isloggedIn = req.session.isloggedIn

        next()
    }

}