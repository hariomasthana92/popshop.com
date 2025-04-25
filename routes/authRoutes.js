import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, coordinates } = req.body;

        console.log(" Register body:", req.body);

        if (!name || !email || !password || !role || !coordinates) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (!Array.isArray(coordinates) || coordinates.length !== 2) {
            return res.status(400).json({ message: "Coordinates must be [longitude, latitude]." });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            location: {
                type: "Point",
                coordinates: coordinates
            }
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "yourSuperSecretKey123", { expiresIn: '1h' });
        res.status(201).json({ message: "User created!", token });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Debug: Log login attempt
        console.log("Login attempt:", email, password);

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect email or password!" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "yourSuperSecretKey123", { expiresIn: '1h' });
        res.json({
            message: "Login successful",
            token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              location: user.location,
            }
          });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/temp', (req, res) => {
    res.send('Temp route is working');
});
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
  });

export default router;
