const bcrypt = require("bcrypt")
const User = require("../Models/User")
const { validationResult } = require("express-validator")
const errorFormatter = require("../utils/validationErrorFormatter")
const flash = require("../utils/flash")




exports.signupGetController = (req, res, next) => {

    res.render('pages/auth/signup', {
        title: "Create A New Account",
        error: {},
        value: {},
        flashMessage: Flash.getMessage(req)
    })

}
exports.signupPostController = async(req, res, next) => {

    let {
        username,
        email,
        password,
    } = req.body

    let error = validationResult(req).formatWith(errorFormatter)

    req.flash("faild", "please check your from")
    if (!error.isEmpty()) {
        req.flash("fail", "please chack your from")
        res.render('pages/auth/signup', {
            title: "Create A New Account",
            error: error.mapped(),
            flashMessage: Flash.getMessage(req)
        })

    }


    try {
        let hashPassword = await bcrypt.hash(password, 12)
        let user = new User({
            username,
            email,
            password: hashPassword,

        })
        await user.save()
        req.flash("success", "User created successfully")
        res.redirect("./auth/login")


    } catch (e) {
        console.log(e)
        next(e)
    }


}
exports.loginGetController = (req, res, next) => {

    console.log(req.session)
    res.render("pages/auth/login", {
        title: "Login the acount",
        error: {},
        flashMessage: Flash.getMessage(req)

    })

}
exports.loginPostController = async(req, res, next) => {
    let { email, password } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        req.flash("fail", "please chack your from")
        return res.render("pages/auth/login", {
            title: "Login the account",
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req)
        });
    }

    try {
        let user = await User.findOne({ email });

        if (!user) {
            req.flash("fail", "Please provide valid value")
            return res.render("pages/auth/login", {
                title: "Login the account",
                error: { email: { msg: "Invalid credentials" } },
                flashMessage: Flash.getMessage(req)

            });
        }
        let match = await bcrypt.compare(password, user.password);

        if (!match) {
            req.flash("fail", "Please provide valid value")
            return res.render("pages/auth/login", {
                title: "Login the account",
                error: { password: { msg: "Invalid credentials" } },
                flashMessage: Flash.getMessage(req)
            });
        }

        req.session.loggedIn = true
        req.session.user = user
        req.session.save(err => {

            if (err) {
                console.log(err)
                return next()
            }
            req.flash("success", "Succsessfully login")
            res.redirect("/dashboard")

        })


    } catch (e) {
        console.log(e);
        next(e);
    }
};

exports.logOutController = (req, res, next) => {


    req.session.destroy(err => {

        if (err) {
            console.log(err)
            return next()
        }
        req.flash("success", "Succsessfully logout")
        return res.redirect("/auth/login")

    })

}