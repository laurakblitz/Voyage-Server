require("dotenv").config();

const express = require("express");

const db = require("./db");

const app = express();

app.use(require('./middleware/headers'));

// db.sync()

const controllers = require("./controllers");

app.use(express.json());

// app.use(require('./middleware/validateSession'));
app.use("/log", controllers.editlogcontroller);

// app.use(express.static(__dirname + '/public'));
// console.log(__dirname)
app.get('/', (req, res)=> res.send('hi guys'));

// app.listen(process.env.PORT, () => console.log(`[Server:] App is listening on Port ${process.env.PORT}`))

db.authenticate()
.then(() => db.sync())
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));
})
.catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.error(err);
});
