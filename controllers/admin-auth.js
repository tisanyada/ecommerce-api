const Product = require('../models/Product');


const validateProductInput = require('../validations/createproduct');
const { imageUpload } = require('../middlewares/fileConfig');



exports.getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.json({ success: true, products: products });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching products' });
        });
}


exports.createProduct = (req, res) => {
    const { title, price, description } = req.body;
    const image = req.file;
    const { errors, isValid } = validateProductInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    } else if (!imageUpload(image)) {
        errors.image = 'image is required or image type not supported. use jpeg, jpg or png file formats';
        res.status(400).json(errors);
    } else {
        Product.findOne({ 'title': title })
            .then(product => {
                if (product) {
                    errors.title = 'a product with this title already exists';
                    res.status(400).json(errors);
                } else {
                    const prod = new Product({
                        adminId: req.user.id,
                        title,
                        price,
                        description,
                        imageUrl: image.path
                    });
                    prod.save()
                        .then(product => {
                            res.json({ success: true, product: product });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ message: 'an error occured while creating new product' });
                        });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'an error occured while locating product with title' });
            });
    }
}