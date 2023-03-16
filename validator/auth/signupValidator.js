const { body } = require("express-validator")
const User = require("../../Models/User")
module.exports = [

    body("username")
    .isLength({ min: 2, max: 15 }).withMessage("User Name must be between 2 to 15 ")
    .custom(async username => {
        let user = await User.findOne({ username })
        if (user) {
            return Promise.reject("This name all ready given")
        }
    }),
    body("email")
    .isEmail().withMessage("please provide valid email")
    .custom(async email => {

        let user = await User.findOne({ email })
        if (user) {
            return Promise.reject("Email all ready used")
        }

    }),
    body("password")
    .isLength({ min: 6 }).withMessage("password minimum 6 char"),
    body("confirmPassword")
    .isLength({ min: 6 }).withMessage("Match")
    .custom((confirmPassword, { req }) => {

        if (confirmPassword != req.body.password) {
            throw new Error("password doees not match")
        }
        return true
    })

]