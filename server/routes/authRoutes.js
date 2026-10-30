    const express = require("express");
    const router = express.Router();
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");
    const User = require("../models/User");

    // REGISTER API
    router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide name, email, and password",
        });
        }

        // Check password length
        if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long",
        });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
        email: email.trim().toLowerCase(),
        });

        if (existingUser) {
        return res.status(409).json({
            message: "User already exists with this email",
        });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        });

        res.status(201).json({
        message: "Registration successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        });
    } catch (error) {
        if (error.code === 11000) {
        return res.status(409).json({
            message: "Email is already registered",
        });
        }

        console.error("Registration error:", error.message);

        res.status(500).json({
        message: "Registration failed",
        });
    }
    });

    // LOGIN API
    router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password",
        });
        }

        // Find user
        const user = await User.findOne({
        email: email.trim().toLowerCase(),
        });

        if (!user) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
        }

        // Check JWT secret
        if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing from .env file");
        }

        // Generate token
        const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
        );

        res.json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        });
    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
        message: "Login failed",
        });
    }
    });

    module.exports = router;