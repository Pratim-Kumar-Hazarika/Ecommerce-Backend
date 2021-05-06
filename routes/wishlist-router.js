const express = require('express');
const router = express.Router();


const WihlistController = require("../controllers/wishlist")
router.route("/")
.get(WihlistController.get_all_wishlist_items)
.post(WihlistController.post_item_to_wishlist)


router.param("wishlistId",WihlistController.wishlist_param)

router.route("/:wishlistId")
.get(WihlistController.get_single_wishlist_item)
.delete(WihlistController.delete_wishlist_item)
module.exports = router;