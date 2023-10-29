const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const corsOptions = {
    origin: "*"
}
const db = require("./app/models")
app.use(cors(corsOptions))
// parse requests of content-types - application/json
app.use(bodyParser.json({limit: '50mb'}))
// parse requests of content-types - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
//Connect
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err)
        process.exit()
    })
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue dans la base de données Coding Context 2023" })
})
require("./app/routes/address.routes")(app)
require("./app/routes/user.route")(app)
// set port, listen for requests
const PORT = process.env.PORT || 3060;
app.listen(PORT, () => {
    console.log(`Serveur en cours sur le port ${PORT}.`);
})
