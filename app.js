require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const config = require("config")
const chalk = require('chalk');



// input router -----------------------------
const setRouter = require("./routes/routes")


//input middleware -------------------
const { binduserWithMiddleware } = require("./middleware/authMiddleware");
const setlocal = require("./middleware/setlocal");



const mondoDB_URI = `mongodb+srv://${config.get("db-username")}:${config.get("db-password")}@oddland.n7f2wkp.mongodb.net/?retryWrites=true&w=majority`;
const store = new MongoDBStore({
    uri: mondoDB_URI,
    collection: "Sessions",
    expires: 1000 * 60 * 60 * 2,
});



const app = express();



// views setUp -----------------------
app.set("view engine", "ejs");
app.set("views", "views");



// middleware Array ------------------
const middleware = [
    express.static("public"),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: config.get("secret"),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 2,
        },
        store: store,
    }),

    binduserWithMiddleware(),
    setlocal(),
    flash(),
];


//using route from route directory
setRouter(app)


const PORT = process.env.PORT || 8080;
mongoose.set("strictQuery", false);
mongoose
    .connect(mondoDB_URI)
    .then(() => {
        console.log(chalk.green("database connected "));
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    })
    .catch((e) => {
        return console.log(e);
    });