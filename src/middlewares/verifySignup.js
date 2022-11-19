import User from "../models/User";
import { ROLES } from "../models/Role";

const checkDuplicateUsernameOrEmail = async(req, res, next) => {
    try {
        const user = await User.findOne({ usuario: req.body.usuario });
        if (user)
            return res.status(400).json({ message: "El usuario ya existe" });
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} No existe`,
                });
            }
        }
    }

    next();
};

export { checkDuplicateUsernameOrEmail, checkRolesExisted };