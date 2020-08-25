const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nickname: String,
});

module.exports = mongoose.model("test_user", UserSchema);