const Product = require("../models/product");
const _ = require("lodash");
const fs = require("fs");
const joi = require("joi");

const formidable = require("formidable");

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtension = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not uploaded !",
      });
    }

    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > Math.pow(10, 6)) {
        return res.status(400).json({
          error: "Image shoud be less than 1mb in size !",
        });
      }

      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
      product.customPhoto = true;
    }

    const schema = joi.object({
      name: joi.string().required(),
      description: joi.string().required(),
      price: joi.required(),
      quantity: joi.required(),
      category: joi.required(),
    });

    const { error } = schema.validate(fields);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          err: "Product not persist",
        });
      }
      res.json({
        product,
      });
    });
  });
};

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(404).json({
        error: "Product not found ! ",
      });
    }

    req.product = product;

    next();
  });
};

exports.showProduct = (req, res) => {
  req.product.photo = undefined;

  res.json({ product: req.product });
};

exports.removeProduct = (req, res) => {
  let product = req.product;

  product.remove((err, product) => {
    if (err) {
      return res.status(404).json({
        error: "Product not found ! ",
      });
    }

    res.json({
      message: "Product deleted",
      product,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtension = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not uploaded !",
      });
    }

    let product = req.product;

    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > Math.pow(10, 6)) {
        return res.status(400).json({
          error: "Image shoud be less than 1mb in size !",
        });
      }

      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
      product.customPhoto = true;
    }

    const schema = joi.object({
      name: joi.string().required(),
      description: joi.string().required(),
      price: joi.required(),
      quantity: joi.required(),
      category: joi.required(),
    });

    const { error } = schema.validate(fields);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          err: "Product not updated",
        });
      }
      res.json({
        product,
      });
    });
  });
};
