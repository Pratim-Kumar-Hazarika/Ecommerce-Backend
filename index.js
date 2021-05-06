const express = require('express');
const Port =3000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {intializeConnectionToDb} = require("./database/db.connection");
const { sendDataToDb } = require("./database/sendData");
const {routeHandler} = require("./middlewares/route-handler.middleware.js");
const {errorHandler} = require("./middlewares/error-handler.middleware.js");
const productsRouter = require("./routes/product-router");
const cartRouter = require("./routes/cart-router");
const wishlistRouter = require("./routes/wishlist-router");
const userRouter = require("./routes/user-router");


app.use(cors())
app.use(bodyParser.json())
intializeConnectionToDb()
// sendDataToDb()


app.get('/', (req, res) => {
  res.send('Ecommerce Api.....')
});

app.use("/product",productsRouter)
app.use("/cart",cartRouter)
app.use("/wishlist",wishlistRouter)
app.use("/users", userRouter)

app.use(routeHandler)
app.use(errorHandler)

app.listen(Port, () => {
  console.log('Server Started on port no :',Port);
});