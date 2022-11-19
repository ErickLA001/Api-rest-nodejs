import { Schema, model } from "mongoose";

//Esquema que se utilizara para crear las noticias.
const newSchema = Schema({
    title: String,
    description: String,
    date: String,
    image: String,
    author: String,
    active: Boolean
});

export default model("News", newSchema);