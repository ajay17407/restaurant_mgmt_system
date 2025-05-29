import User from "../models/User.js";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async(req,res) => {
    try{
        const {name,email,password} = req.body;

        const existingUser = await User.findOne({where: {email}});
        if(existingUser) return res.status(400).json({message:"User already exists"});

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,
            email,
            password:hashedPassword
        });

        res.status(201).json({message:"registration successfull" ,user : { id: user.id, name: user.name, email: user.email  }});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:"registration failed"});
    }
};

export const loginUser = async(req,res) => {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({where:{email}});
        if(!user) return res.status(400).json({message:"user not found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"invalid credentials"});

        const token = jwt.sign({id:user.id},
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        res.status(200).json({messagge:"login successfull",token,user:{id: user.id, name: user.name, email: user.email }})
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:"Login failed"});
    }
};


