const productsFromFaker = require("../models/product-data");
const { Product } = require("../models/products-model");

async function sendDataToDb() {
  try {
    productsFromFaker.forEach(async (product) => {
      const newProduct = new Product(product);
      const savedProduct = await newProduct.save();
      console.log("Products send are :", savedProduct)
    });
  } catch (error) {
    console.log("Not able to send data to db", error);
  }
}
module.exports = { sendDataToDb };