import { Schema, model } from "mongoose";

//Esquema que se utilizara para crear una empresa.
const empresaSchema = Schema({
    asociado: Number,
    nombre: String,
    date: String,
    image: String,
    active: Boolean,
    direccion: String
});

export default model("Empresa", empresaSchema);