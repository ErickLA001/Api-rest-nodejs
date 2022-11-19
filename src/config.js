import { config } from "dotenv";
config();

export default {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://JordiLopez:qwerty123@clusterambiental.s5cgv.mongodb.net/?retryWrites=true&w=majority",
    PORT: process.env.PORT || 4000,
    SECRET: 'products-api'
};







//'mongodb://localhost:27017/proyecto'
//+srv://JordiLopez:qwerty123@clusterambiental.s5cgv.mongodb.net/?retryWrites=true&w=majority