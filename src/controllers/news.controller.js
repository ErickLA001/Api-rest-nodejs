import News from "../models/News"
import fs from "fs";
import path from "path";



export const InsertNews = async(req, res) => {
    const news = new News();

    const { title, description, date, image, author, active } = req.body;

    news.title = title;
    news.description = description;
    news.date = date;
    news.image = image;
    news.author = author;
    news.active = active;

    if (!title) {
        res.status(404).send({ message: "El titulo es necesario para crear una notica." })
    } else {
        const newsSaved = await news.save((err, newsStored) => {
            if (err) {
                res.status(500).send({ message: `Error de servidor:${err}` });
            } else {
                if (!newsStored) {
                    res.status(404).send({ message: "Error al crear la noticia." })
                } else {
                    res.status(200).send({ news: newsStored });
                }
            }
        });
    }

};

export const getNews = async(req, res) => {
    News.find().sort({ $natural: -1 }).then(news => {
        if (!news) {
            res.status(404).send({ message: "No se han encontrado noticias." })
        } else {
            res.status(200).send({ news })
        }
    });
};

export const updateNews = async(req, res) => {
    const newsData = req.body;
    const params = req.params;

    News.findByIdAndUpdate({ _id: params.id }, newsData, (err, newsUpdate) => {
        if (err) {
            //res.status(500).send({ message: "Error del servidor." });
            res.status(500).send(err);
        } else {
            if (!newsUpdate) {
                res.status(404).send({ message: "No se ha encontrado ningun usuario." });
            } else {
                res.status(200).send({ message: "Noticia Actualizada" });
            }
        }
    })
}

export const deleteNews = async(req, res) => {
    const { id } = req.params;
    News.findByIdAndRemove(id, (err, userDelete) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!userDelete) {
                res.status(404).send({ message: "No se ha encontrado ningun usuario." });
            } else {
                res.status(200).send({ message: "Noticia Eliminada" });
            }
        }
    })
}

export const uploadImage = async(req, res) => {
    const params = req.params;
    News.findById({ _id: params.id }, (err, newData) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!newData) {
                res.status(404).send({ message: "No se ha encontrado ningun usuario." });
            } else {
                let news = newData;


                console.log(news);
                console.log(req.files);

                if (req.files) {
                    let filePath = req.files.image.path;
                    let fileSplit = filePath.split('\\');
                    let fileName = fileSplit[2];
                    let extSplit = fileName.split('.');
                    let fileExt = extSplit[1];
                    if (fileExt !== "png" && fileExt !== "jpg") {
                        res.status(400).send({ message: "La extension de la imagen no es validad . (Extensione spermitidas: .png y .jpg)" });
                    } else {
                        news.image = fileName;
                        News.findByIdAndUpdate({ _id: params.id }, news, (err, newsResult) => {
                            if (err) {
                                res.status(500).send({ message: "Error del servidor" });
                            } else {
                                if (!newsResult) {
                                    res.status(404).send({ message: "No se ha encontrado ningun usuario" });
                                } else {
                                    res.status(200).send({ imageName: fileName });
                                }
                            }
                        })
                    }


                }
            }
        }
    });
}

export const getImage = async(req, res) => {
    const imageName = req.params.imageName;
    console.log(imageName);
    const filePath = "./uploads/imagenes/" + imageName;
    console.log(filePath);

    fs.exists(filePath, exists => {
        if (!exists) {
            res.status(404).send({ message: "La imagen no esta disponible" });
        } else {
            res.sendFile(path.resolve(filePath));
        }
    });
}

export const getOneNews = async(req, res) => {
    //Recoger el id de la url
    var newsId = req.params.id;
    //comporbar si existe
    if (!newsId || newsId == null) {
        res.status(404).send({ message: "No existe el artituculo" });
    }
    //buscar el articulo
    News.findById(newsId, (err, news) => {
        if (err) {
            res.status(500).send({ message: "Error al devolver los datos" });
        } else {
            if (!news) {
                res.status(404).send({ message: "No existe el articulo" });
            } else {
                res.status(200).send({ news })
            }
        }
    });

}