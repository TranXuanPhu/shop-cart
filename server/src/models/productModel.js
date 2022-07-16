const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  announced: {
    type: String,
    required: true,
  },
  dimensions: {
    type: String,
    required: true,
  },
  wight: {
    type: String,
    required: true,
  },
  sim: {
    type: String,
    required: true,
  },

  size: {
    type: String,
    required: true,
  },
  resolution: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  chipset: {
    type: String,
    required: true,
  },
  cpu: {
    type: String,
    required: true,
  },
  gpu: {
    type: String,
    required: true,
  },
  internal: {
    type: String,
    required: true,
  },
  usb: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'images',
    },
  ],
});

//middleware always find images
productModel.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: 'images', options: { _recursed: true } });
  this.select('-__v');
  next();
});

const product = mongoose.model('products', productModel);
module.exports = product;
