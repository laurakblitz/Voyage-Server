require("dotenv").config();
const express = require("express");
const app = express();

// app.use(express.static(__dirname + '/public'));
// console.log(__dirname)
app.get('/', (req, res)=> res.send('hi guys'));

app.listen(process.env.PORT, ()=>console.log(`[Server:] App is listening on Port ${process.env.PORT}`))