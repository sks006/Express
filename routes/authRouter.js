const router = require("express").Router()

const signupValidator = require("../validator/auth/signupValidator")
const loginValidator = require("../validator/auth/loginValidator")


const { signupGetController, signupPostController, loginGetController, loginPostController, logOutController } = require("../controllers/authController")

const { isUnAuthenticate } = require("../middleware/authMiddleware")



router.get("/signup", isUnAuthenticate, signupGetController)
router.post("/signup", isUnAuthenticate, signupValidator, signupPostController)

router.get("/login", isUnAuthenticate, loginGetController)
router.post("/login", isUnAuthenticate, loginValidator, loginPostController)
router.get("/logOut", logOutController)



module.exports = router