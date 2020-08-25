const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    room_code = Number,
    room_member = Array,
});

module.exports = mongoose.model("test_user", RoomSchema);