const { Product } = require("../models/products-model");


exports.product_param = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ success: false, message: "product not found"})
    } 

    req.product = product;
    next()
  } catch {
    res.status(400).json({ success: false, message: "could not retrieve product "})
  }
}

exports.get_all_products = async (req, res) => {
    try {
      const product = await Product.find()
      res.json({ success: true, product, message: "coming from database..." })
    } catch (error) {
      res.status(500).json({ success: false, message: "Products not found.." })
    }
  }

exports.get_single_product = (req, res) => {
    const { product } = req
    product.__v = undefined;
    res.json({ success: true, product })
}

