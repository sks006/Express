const Router = require("express").Router()
const { check, validationResult } = require("express-validator")
const Flash = require("../utils/flash")

Router.get("/validator", (req, res, next) => {
    console.log(Flash.getMessage(req))
    res.render("playground/signup", { title: "validator playground" })
})

Router.post("/validator", [
    check("username")
    .not()
    .isEmpty()
    .withMessage("User name can't be empty")
    .isLength({ max: 15 })
    .withMessage("User name can't be more than 15 characters"),
    check("email")
    .not()
    .isEmpty()
    .withMessage("Please provide email"),
    check('password').custom(value => {
        if (value.length < 9) {
            throw new Error("Password should be at least 9 characters")
        }
        return true
    }),
    check("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match")
        }
        return true
    })
], (req, res, next) => {
    let errors = validationResult(req)

    if (errors.isEmpty()) {
        req.flash("success", "There are no errors")
    } else {
        req.flash("fail", "There are some errors")
    }
    res.redirect("/playground/validator")
})

module.exports = Router