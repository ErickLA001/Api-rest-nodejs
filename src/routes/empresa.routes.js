import { Router } from "express";
const router = Router();

import * as empresaCtrl from "../controllers/empresa.controller";
//import { authJwt } from "../middlewares";
const muiltipart = require("connect-multiparty");
const mdupload_image = muiltipart({ uploadDir: "./uploads/imagenes" });

// rutas de empresas
router.get("/", empresaCtrl.getEmpresa);
router.get("/:empresaId", empresaCtrl.getEmpresaById);
router.post("/", empresaCtrl.createEmpresa);
router.put("/:empresaId", empresaCtrl.updateEmpresaById);
router.delete("/:empresaId", empresaCtrl.deleteEmpresaById);

// rutas de images
router.put("/upload-image/:id", [mdupload_image], empresaCtrl.uploadImage);
router.get("/get-image/:imageName", empresaCtrl.getImage);

export default router;