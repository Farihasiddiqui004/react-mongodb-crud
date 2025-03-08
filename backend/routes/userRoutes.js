const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Create User
router.post("/", async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
});

// Read Users
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Update User
router.put("/:id", async (req, res) => {
    try {
        const { _id, ...updateData } = req.body; // ✅ `_id` exclude کر دیا
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});

// Delete User
router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted" });
});

module.exports = router;
