import Product from "../models/Product";
import fs from "fs";
import path from "path";


export const createProduct = async(req, res) => {
    const { codigo, nombre, tipo, descripcion, impacto, reciclaje, image } = req.body;

    try {
        const newProduct = new Product({
            codigo,
            nombre,
            tipo,
            descripcion,
            impacto,
            reciclaje,
            image
        });

        const productSaved = await newProduct.save();

        res.status(201).json(productSaved);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getProductById = async(req, res) => {
    const code = req.params.productId;

    const product = await Product.findOne({ codigo: code });
    if (!product) {
        res.status(404).send({ message: "No se ha encontrado ningun producto." });
    } else {
        res.status(200).json(product);;
    }

};

export const getProducts = async(req, res) => {
    const products = await Product.find().sort({ $natural: -1 });
    return res.json(products);
};

export const updateProductById = async(req, res) => {
    const code = req.params.productId
    const updatedProduct = await Product.findOneAndUpdate({
            codigo: code
        },
        req.body, {
            new: true,
        }
    );
    res.status(200).send({ message: "Producto Actualizado" });
};


export const deleteProductById = async(req, res) => {
    const code = req.params.productId;

    const deleteOne = await Product.findOneAndDelete({ codigo: code });

    // code 200 is ok too
    res.status(200).send({ message: "Producto eliminado" });
};


// controladores imagenes


export const uploadImage = async(req, res) => {
    const params = req.params;
    Product.findById({ _id: params.id }, (err, newData) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!newData) {
                res.status(404).send({ message: "No se ha encontrado ningun usuario." });
            } else {
                let product = newData;


                console.log(product);
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
                        product.image = fileName;
                        Product.findByIdAndUpdate({ _id: params.id }, product, (err, newsResult) => {
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