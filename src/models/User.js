import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new Schema({
    usuario: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }]
}, {
    versionKey: false,
});

productSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hashSync(password, salt);
};

productSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model("User", productSchema);