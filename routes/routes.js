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



// const authRouter = require("./authRouter")
// const dashboardRouter = require("./dashboardRouter")

// const routes = [{
//         method: 'get',
//         path: '/auth/signup',
//         handler: authRouter.signupGetController
//     },
//     {
//         method: 'post',
//         path: '/auth/signup',
//         handler: authRouter.signupPostController
//     },
//     {
//         method: 'get',
//         path: '/auth/login',
//         handler: authRouter.loginGetController
//     },
//     {
//         method: 'post',
//         path: '/auth/login',
//         handler: authRouter.loginPostController
//     },
//     {
//         method: 'get',
//         path: '/auth/logout',
//         handler: authRouter.logOutController
//     },
//     {
//         method: 'get',
//         path: '/dashboard',
//         handler: dashboardRouter.dashboardGetController
//     },
//     {
//         method: 'post',
//         path: '/dashboard/search',
//         handler: dashboardRouter.dashboardPostController
//     },
//     {
//         method: 'get',
//         path: '/',
//         handler: (req, res) => {
//             res.json({ message: 'Hello World!' })
//         }
//     }
// ]

// module.exports = app => {
//     routes.forEach(route => {
//         const { method, path, handler } = route;
//         if (method === 'get') {
//             app.get(path, handler);
//         } else if (method === 'post') {
//             app.post(path, handler);
//         } else if (method === 'put') {
//             app.put(path, handler);
//         } else if (method === 'delete') {
//             app.delete(path, handler);
//         }
//     });
// };  },
//     {
//         method: 'post',
//         path: '/dashboard/search',
//         handler: dashboardRouter.dashboardPostController
//     },
//     {
//         method: 'get',
//         path: '/',
//         handler: (req, res) => {
//             res.json({ message: 'Hello World!' })
//         }
//     }
// ]

// module.exports = app => {
//     routes.forEach(route => {
//         const { method, path, handler } = route;
//         if (method === 'get') {
//             app.get(path, handler);
//         } else if (method === 'post') {
//             app.post(path, handler);
//         } else if (method === 'put') {
//             app.put(path, handler);
//         } else if (method === 'delete') {
//             app.delete(path, handler);
//         }
//     });
// };  });
// };