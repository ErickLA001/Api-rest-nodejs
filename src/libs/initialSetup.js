import Role from "../models/Role";
import User from "../models/User";

import bcrypt from "bcryptjs";

export const createRoles = async() => {
    try {
        // Count Documents
        const count = await Role.estimatedDocumentCount();

        // check for existing roles
        if (count > 0) return;

        // Create default Roles
        const values = await Promise.all([
            new Role({ name: "admin" }).save(),
        ]);

        console.log(values);
    } catch (error) {
        console.error(error);
    }
};

export const createAdmin = async() => {
    // check for an existing admin user
    const user = await User.findOne({ usuario: "admin" });
    // get roles _id
    const roles = await Role.find({ name: { $in: ["admin"] } });

    if (!user) {
        // create a new admin user
        await User.create({
            usuario: "admin",
            password: await bcrypt.hash("admin", 10),
            roles: roles.map((role) => role._id),
        });
        console.log('Admin User Created!')
    }
};