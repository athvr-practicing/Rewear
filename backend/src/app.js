const express = require("express")
const cors = require("cors")
const app = express();
const cookieParser = require('cookie-parser');

const dbConnection = require("./db/db.js");
const AuthRouter = require("./routes/auth.route.js");
const ItemRoute = require("./routes/item.route.js");
const Listcat = require("./routes/categories.route.js");

dbConnection()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use("/api/auth", AuthRouter)
app.use("/api", ItemRoute)
app.use("/api/categories", Listcat)

app.get("/", (req, res)=>{
    res.send("hey")
})

module.exports = app