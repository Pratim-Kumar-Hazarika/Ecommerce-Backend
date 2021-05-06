const express = require('express');
const router = express.Router();

const CartController = require("../controllers/cart")

router.route("/")
.get(CartController.get_all_cart_items)
.post(CartController.add_item_to_cart)

router.param("cartId",CartController.cart_param)
router.route("/:cartId")
  .get(CartController.get_single_cart_item)
  .delete(CartController.delete_cart_item)
module.exports = router;