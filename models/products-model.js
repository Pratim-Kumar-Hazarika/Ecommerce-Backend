const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  image: String,
  price: Number,
  inStock :Boolean,
  fastDelivery:Boolean,
  offer:String,
  description:String
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product};