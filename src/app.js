import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";

import productRoutes from "./routes/products.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import newsRoutes from "./routes/new.routes";
import empresaRoutes from "./routes/empresa.routes";

import { createRoles, createAdmin } from "./libs/initialSetup";

const app = express();

createRoles();
createAdmin();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares

const corsOptions = {
    // origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
    res.json({
        message: "Bienvenido a Ambietal API",
        name: app.get("pkg").name,
        version: app.get("pkg").version,
        description: app.get("pkg").description,
        author: app.get("pkg").author,
    });
});

// Routes
app.use("/api/productos", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/empresa", empresaRoutes);

export default app;