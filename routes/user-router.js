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

router.route("/:userId/cart/quantity")
.post(async (req, res) => {
  try {
    const { userId } = req.params; 
    const {cartId} = req.body;  
    const {incrementQuantity} = req.body;
    await User.update({"_id":userId,"cart._id":cartId},{
      "$set":{
        "cart.$.quantity":incrementQuantity
      }
    }, { upsert: true })
res.json({ success: true, message: "Product updation successfull" })
  } catch{
    res.status(500).json({ success: false, message: "User doesn't have items in cart....." })
  }
})


///GET ALL ITEMS OF WISHLIST FOR A USER 
router.route("/:userId/wishlist")
.get(UserController.get_user_wishlist)
.post(UserController.add_item_to_wishlist)
.delete(UserController.delete_item_from_wishlist )

///USER ADDRESS...
router.route("/:userId/address")
  .get(UserController.get_user_address)
  .post(UserController.add_address_to_user)
  .delete(UserController.delete_address_of_user)

///UPDATE USER ADDRESS...
router.route("/:userId/address/update")
  .post(UserController.update_user_address)

module.exports = router
