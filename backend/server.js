const express = require("express");
const bodyParser = require("body-parser");
const terminalLink = require('terminal-link');
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;
const corsOptions = {
    origin: `${process.env.ORIGIN}`
};

const db = require("./src/models/sequelize");
db.sql.sync();
// db.sql.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const userRoute= require('./src/routes/user.route');
const deviceRoute= require('./src/routes/appel.route');
app.use(userRoute,deviceRoute);
app.get('/', (req, res) => res.json({ application: 'Works ...' }));
app.listen(port, () => {
    const link1= terminalLink('', `http://localhost:${port}`);
    console.log(`Server is listening on port ${port} ${link1}`);
});
