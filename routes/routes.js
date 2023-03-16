const authRouter = require("./authRouter")
const dashboardRouter = require("./dashboardRouter")
const routes = [{
        path: "/auth",
        handler: authRouter,
    },
    {
        path: "/dashboard",
        handler: dashboardRouter,
    },
    {
        path: "/",
        handler: (req, res) => {
            res.json({
                message: "Hello You",
            });
        }
    }
]
module.exports = app => {
    routes.forEach(r => {
        app.use(r.path, r.handler)
    })
}