const express = require("express");
const router = express.Router();
const leave = require("../middleWare/authMiddleware");
const {
    createLeave,
    getLeaves,
    getLeave,
    deleteLeave,
    updateLeave,
} = require("../controllers/leaveController");


router.post("/", leave, createLeave);
router.patch("/:id", leave, updateLeave);
router.get("/", leave, getLeaves);
router.get("/:id", leave, getLeave);
router.delete("/:id", leave, deleteLeave);

module.exports = router;
