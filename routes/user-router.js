const express = require('express');
const router = express.Router()
const UserController = require("../controllers/user")

////ALL USERS
router.route("/")
.get(UserController.all_users)
.post(UserController.add_user)

router.param("userId", UserController.extract_user_param)

////SINGLE USER
router.route("/:userId")
.get(UserController.get_single_user)
.delete(UserController.delete_user )


////USER CART
router.route("/:userId/cart")
.get(UserController.get_user_cart)
.post(UserController.add_item_to_cart)
.delete(UserController.delete_item_from_cart)


///GET ALL ITEMS OF WISHLIST FOR A USER 
router.route("/:userId/wishlist")
.get(UserController.get_user_wishlist)
.post(UserController.add_item_to_wishlist)
.delete(UserController.delete_item_from_wishlist )

module.exports = router
