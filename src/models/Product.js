import { Schema, model } from "mongoose";

const productSchema = new Schema({
    codigo: Number,
    nombre: String,
    tipo: String,
    descripcion: String,
    impacto: Number,
    reciclaje: String,
    image: String
}, {
    versionKey: false
});

export default model("Product", productSchema);