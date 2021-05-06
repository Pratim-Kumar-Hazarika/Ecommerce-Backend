const Cart = require("../models/cart-model")


exports.cart_param = async(req,res,next,cartId)=>{
  try{
    const cart = await Cart.findById(cartId).populate("product")
    if(!cart){
      return res.status(400).json({success:false,message:"Product doesnot exist in cart.."})
    }
    req.cart = cart
    next()
  }catch(err){
    res.status(400).json({success:false, message:"Error retreiving the product from cart.."})
  }
}

exports.get_all_cart_items = async(req,res)=>{
  try{
    const cart = await Cart.find().populate("product")
    const items = cart.map((item)=> item.product)
    res.json({success:true, cartLength:cart.length, message:"Cart products are..", cart})
  }catch(err){
    res.status(500).json({success:false, message:"Error occured while getting the cart Items"})
  }
}

exports.add_item_to_cart = async(req,res)=>{
  try{
  const cart = req.body
    const NewCartProduct = new Cart({
            _id :req.body._id,
            quantity:req.body.quantity,
            product : req.body._id, 
      })
    const saveCartProduct = await NewCartProduct.save()
    res.json({success:true, message:"Product saved to cart...", cart:saveCartProduct})
  }catch(err){
    res.status(500).json({success:false, message:"Unable to saved the product to cart.."})
  }
 }

 exports.get_single_cart_item = (req, res) => {
    let {cart} = req
    res.json({ success: true,message:"Product from cart is", cartItem :cart })
  }

  exports.delete_cart_item =async(req,res)=>{
    let {cart} = req
    await cart.remove();
    res.json({sucess:true, message:"Product is deleted from the cart.."})
  }