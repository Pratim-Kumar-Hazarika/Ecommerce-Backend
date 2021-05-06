const mongoose = require("mongoose");

const wishSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
 product:{type: mongoose.Schema.Types.ObjectId, ref:"Product", required:true},
  quantity:{type:Number, default:1}
})

module.exports = mongoose.model("Wishlist", wishSchema);