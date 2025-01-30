const express = require("express");
const Customer = require("../models/Customer");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

//  Get all customers
router.get("/", authMiddleware, async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

//  Add Customer (With Phone)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const newCustomer = new Customer({ name, email, phone });
        await newCustomer.save();
        res.json(newCustomer);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

//  Update Customer
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            { name, email, phone },
            { new: true }
        );
        res.json(updatedCustomer);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

//  Delete Customer
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ msg: "Customer deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
