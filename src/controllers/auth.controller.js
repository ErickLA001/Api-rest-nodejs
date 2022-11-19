import User from "../models/User";
import Role from "../models/Role";

import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async(req, res) => {
    try {
        // Getting the Request Body
        const { usuario, password, roles } = req.body;

        // Creating a new User Object
        const newUser = new User({
            usuario,
            password: await User.encryptPassword(password)
        });

        // checking for roles
        if (req.body.roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.findOne({ name: "admin" });
            newUser.roles = [role._id];
        }

        // Saving the User Object in Mongodb
        const savedUser = await newUser.save();

        // Create a token
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const signin = async(req, res) => {
    try {
        // Request body email can be an email or username
        const userFound = await User.findOne({ usuario: req.body.usuario }).populate(
            "roles"
        );

        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(200).json({
                status: "error",
                result: {
                    token: null,
                    message: "Password invalido"
                }
            });

        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).json({
            status: "ok",
            result: { token: token }
        });
    } catch (error) {
        console.log(error);
    }
};