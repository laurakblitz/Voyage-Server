require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();

app.use(require("./middleware/headers"));

// app.use(express.static(__dirname + '/public'));
// console.log(__dirname)
app.use(express.json());

const controllers = require("./controllers");

app.use("/user", controllers.usercontroller);


app.use('/voyage', controllers.logscontroller)

// app.use(require('./middleware/validateSession'));
app.use("/logs", controllers.editlogcontroller);

db.authenticate()
  .then(() => db.sync()) // => {force: true}
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server:] App is listening on Port ${process.env.PORT}`));
  })
  .catch((err) => {
    console.log("[Server:] Server Crashed");
    console.error(err);
  });
