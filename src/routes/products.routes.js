import { Router } from "express";
const router = Router();

import * as productsCtrl from "../controllers/products.controller";
import { authJwt } from "../middlewares";
const muiltipart = require("connect-multiparty");
const mdupload_image = muiltipart({ uploadDir: "./uploads/imagenes" });

//Rutas de prodcutos

router.get("/", productsCtrl.getProducts);
router.get("/:productId", productsCtrl.getProductById);
router.post("/", productsCtrl.createProduct);
router.put("/:productId", productsCtrl.updateProductById);
router.delete("/:productId", productsCtrl.deleteProductById);

//Rutas de images

router.put("/upload-image/:id", [mdupload_image], productsCtrl.uploadImage);
router.get("/get-image/:imageName", productsCtrl.getImage);

export default router;