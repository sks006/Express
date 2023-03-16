const { body } = require("express-validator")
module.exports = [
    body("email")
    .not()
    .isEmpty()
    .withMessage("Email can't be emapty"),
    body("password")
    .not()
    .isEmpty()
    .withMessage("password can't be empty")


]