require("dotenv").config();
const express = require("express");
const app = express();
const db = require('./db')

const controllers = require('./controllers')

app.use(express.json());

app.use('/logs', controllers.logscontroller)

db.authenticate()
    .then(() => db.sync())
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`[Server:] App is listening on Port ${process.env.PORT}`))
    })
    .catch((err) => {
        console.log("[Server:] Server Crashed");
        console.error(err);
    })