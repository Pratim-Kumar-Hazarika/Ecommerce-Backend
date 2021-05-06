const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/products")

router.route("/") .get(ProductsController.get_all_products)

router.param("productId",ProductsController.product_param)

router.route("/:productId") .get(ProductsController.get_single_product)


module.exports = router