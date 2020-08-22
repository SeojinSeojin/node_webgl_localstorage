const express = require("express");
const app = express();

app.use(express.static("staticfiles"));
app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.get("/", function(req, res) {
    res.render("main.html");
});

app.listen(2020, function() {
    console.log("listening to http://localhost:2020/");
});