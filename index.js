const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", function() {
    console.log("connected to mongod server");
});
mongoose.connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.static("staticfiles"));
app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.render("main.html");
});

app.listen(2020, function() {
    console.log("listening to http://localhost:2020/");
});