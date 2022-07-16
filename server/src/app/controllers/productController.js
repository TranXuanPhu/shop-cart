const productModel = require('../../models/productModel.js');
const imageModel = require('../../models/imageModel.js');
const fs = require('fs');
exports.getProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    let images = [];
    products.forEach((product) => {
      // = product.images.map((image) => {
      const imageFirst = {
        name: product.images[0]?.name || '',
        data: product.images[0]?.img.data.toString() || '',
        contentType: product.images[0]?.img.contentType || '',
      };
      // });

      product.images = undefined;
      images.push(imageFirst);
    });
    res.json({ products: products, images });
  } catch (error) {
    console.error('ERROR -------------- exports.getProduct: ', error);
  }
};
exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      next();
      return;
    }

    let images = [];
    product.images.forEach((image) => {
      const imageFirst = {
        name: image.name || '',
        data: image.img.data.toString() || '',
        contentType: image.img.contentType || '',
      };

      product.images = undefined;
      images.push(imageFirst);
    });
    res.json({ product: product, images });
  } catch (error) {
    console.error('ERROR -------------- exports.getProduct: ', error);
  }
};

exports.createProduct = async (req, res, next) => {
  // console.log(req.files.length);
  let imagesId = [];
  for (const file of req.files) {
    const ext = file.mimetype.split('/')[1];
    const img = {
      name: file.filename,
      img: {
        data: fs.readFileSync(file.path).toString('base64'),
        contentType: ext,
      },
    };
    fs.unlinkSync(file.path);

    try {
      const resultImg = await imageModel.create(img);
      // console.log(resultImg._id);
      imagesId.push(resultImg._id);
    } catch (error) {
      console.error(
        'ERROR -------------- exports.createProduct:[CREATE IMAGES] ',
        error
      );
    }
  }

  req.body.images = imagesId;
  // console.log(imagesId);
  // req.files.forEach((file) => {

  // })
  productModel
    .create(req.body)
    .then((product) => {
      console.log(product);
      res.json({ message: 'success', product });
    })
    .catch((err) => {
      console.error('ERROR -------------- exports.createProduct: ', err);
    });
};
