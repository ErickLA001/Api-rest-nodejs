import { Router } from "express";
const router = Router();

import * as NewsController from "../controllers/news.controller";
//import { authJwt } from "../middlewares";

const muiltipart = require("connect-multiparty");
const mdupload_image = muiltipart({ uploadDir: "./uploads/imagenes" });


//endpont de tipo post
router.post("/InsertNew", NewsController.InsertNews);
router.get("/get-news", NewsController.getNews);
router.put("/update-news/:id", NewsController.updateNews);
router.delete("/delete-news/:id", NewsController.deleteNews);
router.put("/upload-image/:id", [mdupload_image], NewsController.uploadImage);
router.get("/get-image/:imageName", NewsController.getImage);
router.get("/get-one-news/:id", NewsController.getOneNews);

export default router;