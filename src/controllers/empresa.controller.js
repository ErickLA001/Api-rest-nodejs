import Empresa from "../models/Empresa";
import fs from "fs";
import path from "path";


export const createEmpresa = async(req, res) => {
    const { asociado, nombre, date, image, active, direccion } = req.body;

    try {
        const newEmpresa = new Empresa({
            asociado,
            nombre,
            date,
            image,
            active,
            direccion,
        });

        const empresaSaved = await newEmpresa.save();

        res.status(201).json(empresaSaved);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getEmpresaById = async(req, res) => {
    const code = req.params.empresaId;

    const empresa = await Empresa.findOne({ asociado: code });
    if (!empresa) {
        res.status(404).send({ message: "No se ha encontrado ninguna empresa." });
    } else {
        res.status(200).json(empresa);
    }

};

export const getEmpresa = async(req, res) => {
    const empresa = await Empresa.find().sort({ $natural: -1 });
    return res.json(empresa);
};

export const updateEmpresaById = async(req, res) => {
    const code = req.params.empresaId
    const updatedProduct = await Empresa.findOneAndUpdate({
            asociado: code
        },
        req.body, {
            new: true,
        }
    );
    res.status(200).send({ message: "Estado de la empresa Actualizado" });
};


export const deleteEmpresaById = async(req, res) => {
    const code = req.params.empresaId;

    const deleteOne = await Empresa.findOneAndDelete({ asociado: code });

    // code 200 is ok too
    res.status(200).send({ message: "Empresa  eliminada" });
};


// imagenes controller

export const uploadImage = async(req, res) => {
    const params = req.params;
    Empresa.findById({ _id: params.id }, (err, newData) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!newData) {
                res.status(404).send({ message: "No se ha encontrado ningun usuario." });
            } else {
                let empresa = newData;


                console.log(empresa);
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
                        empresa.image = fileName;
                        Empresa.findByIdAndUpdate({ _id: params.id }, empresa, (err, newsResult) => {
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