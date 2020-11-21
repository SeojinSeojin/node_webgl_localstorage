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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.render("main.ejs");
});

app.get("/clock", function(req, res) {
    res.render("clock.ejs")
})

const roomModel = require("./models/room");
app.post("/start", async function(req, res) {
    try {
        const user = req.body.username;
        const room = req.body.color;
        const room_model = await roomModel.findOne({ room_code: room });
        //console.log("room model", room_model);
        room_model.room_member.push(user);
        room_model.save(function(err) {
            if (err) {
                console.log(err);
                res.redirect("/");
            } else {
                //console.log("room model", room_model);
                res.render("start.ejs", {
                    room: room,
                    members: room_model.room_member,
                    me: user,
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.render("main.ejs");
    }
});

app.listen(2020, function() {
    console.log("listening to http://localhost:2020/");
});