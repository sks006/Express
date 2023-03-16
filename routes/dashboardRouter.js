const router = require("express").Router();

const {
    dashboardController
} = require("../controllers/dashboradControllers");
const { isAuthenticate } = require("../middleware/authMiddleware")




router.get("/", isAuthenticate, dashboardController);




module.exports = router;