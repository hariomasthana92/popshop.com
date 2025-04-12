import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const {name,email,password,role,location} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "User already exists!"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
        res.status(201).json({message: "User created!"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

export const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({
            email
        });
        if(!user) {
            return res.status(400).json({message: "User does not exist!"});
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Incorrect email or Password!"});
        }
        const token = jwt.sign({id: user._id,role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({message: "Login Successfully", token,User});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};