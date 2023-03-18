const Flash = require("../utils/flash")
exports.dashboradControllers = (req, res, next) => {
    res.render("pages/dashboard/dashboard", { titel: "My Dashboard" })
}