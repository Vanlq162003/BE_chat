import Users from "../models/usersModels";
import bcrypt from "bcryptjs";
import { registerSchema , loginSchema } from "../Schemas/users";
import jwt from "jsonwebtoken";
import { urlencoded } from "express";
import dotenv from 'dotenv'

dotenv.config()



export const Register = async (req, res) => {
    try {
        const { name, email, password , image } = req.body;

        const { error } = registerSchema.validate(req.body, { abortEarly: false });

        

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const userExist = await Users.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                messsage: "Email đã tồn tại",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            name,
            email,
            password: hashedPassword,
            image
        });

        // Không trả password
        user.password = undefined;

        return res.status(201).json({
            message: "Đăng ký thành công",
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
      

        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                messages: errors,
            });
        }

        const user = await Users.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                message: "Tài khoản không tồn tại",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        

        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log(1)

        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user,
        });
    } catch (error) { }
};

export const allUser =  async (req,res) =>{
    try {
        const keyword = req.query.search
        ? {
            $or: [
              { name: { $regex: req.query.search, $options: "i" } },
              { email: { $regex: req.query.search, $options: "i" } },
            ],
          }
        : {};
        const users = await Users.find(keyword).find({ _id: { $ne: req.user._id } });
        return res.status(200).json({
            message: "Tìm kiếm thành công",
            users
        });

    } catch (error) {
        console.log(error)
    }
}