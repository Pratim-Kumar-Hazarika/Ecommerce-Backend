const faker = require("faker");
faker.seed(123)
const productsFromFaker = [...Array(15)].map((item)=>({
          name: faker.commerce.productName(),
          image: faker.random.image(),
          price: faker.commerce.price(),
          inStock: faker.random.boolean(),
          fastDelivery: faker.random.boolean(),
          offer: faker.random.arrayElement([
            "50% OFF",
            "70% OFF",
            "25% OFF",
            "10% OFF",
            "69% OFF"
          ]),
            description: faker.random.arrayElement([
            "Best product you will ever use in your entire life",
            "Why me ? because I am the best product man",
            "Hahahaha I m from apple ios is best as always",
            "Best in android beacuse android is best lamao",
            "Bhai lena hai toh lele warna out of stock hojaunnga"
          ]),

}));
module.exports = productsFromFaker ;