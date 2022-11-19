import mongoose from "mongoose";
import config from "./config";

mongoose
    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((db) => console.log(`DB conectada correctamente`))
    .then((db) => console.log('--- La Aplicacion esta en linea ---'))
    .catch((err) => console.log(err));