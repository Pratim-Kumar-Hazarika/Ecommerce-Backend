const Wishlist = require("../models/wishlist-model");


exports.wishlist_param = async(req,res,next,wishlistId)=>{
  try{
    const wishlist = await Wishlist.findById(wishlistId).populate("product");
    if(!wishlist){
      return res.status(400).json({success:false, message:"Products not found in wishlist....."})
    }
    req.wishlist = wishlist;
    next()
  }catch(err){
    res.status(400).json({success:false, message:"Error retreving products from wishlist...."})
  }
}

exports.get_all_wishlist_items = async(req,res)=>{
  try{
      const wishlist = await Wishlist.find().populate("product");
      res.json({sucess:true,length:wishlist.length, message:"Products coming from wishlist...", wishlist})
  }catch(err){
    res.status(500).json({sucess:false, message:"Error occured while getting the products from wishlist"})
  }
}

exports.post_item_to_wishlist = async(req,res)=>{
  try{
  const wishlist = req.body
    const NewWishProduct = new Wishlist({
             _id :req.body._id,
            quantity:req.body.quantity,
            product : req.body._id, 
      })
    const saveWishProduct = await NewWishProduct.save()
    res.json({success:true, message:"Product saved to wish;ist...", wishlist:saveWishProduct})
  }catch(err){
    res.status(500).json({success:false, message:"Unable to saved the product to wishlist.."})
  }
 }

 exports.get_single_wishlist_item = (req,res)=>{
  let {wishlist} = req;
  res.json({sucess:true, message:"Product from wishlist is...", wishList:wishlist})
}

exports.delete_wishlist_item = async(req,res)=>{
  let{wishlist} = req;
  await wishlist.remove();
  res.json({sucess:true, message:"Product removed from wishlist.."})
}