const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,  // 🆕 Contact field added
    address: String   // 🆕 Address field added
});

module.exports = mongoose.model("User", userSchema);
