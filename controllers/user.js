const  { User } = require("../models/user-model");
const {extend} = require("lodash")
exports.extract_user_param = async(req,res,next,userId)=>{
   try{
     const user = await User.findById(userId).populate("wishlist cart.product")
     if(!user){
       return res.status(400).json({sucess:false,message:"User doesn't exist.."})
     }
     req.user = user;
     next()
   }catch(error){
     res.status(500).json({sucess:false,message:"Error while getting the user..."})
   }
 }

exports.all_users = async(req,res)=>{
  try{
    const users = await User.find({})
    res.json({sucess:true,totalUsers : users.length, message:"Users coming from db...",allUsers:users})
  }catch(error){
    res.status(500).json({sucess:false, message:"Something went wrong while getting data from db..."})
  }
}

exports.add_user = async(req,res)=>{
  try{
    const findUser = await User.find({email:req.body.email})
      if(findUser.length>=1){
        return res.status(400).json({sucess:false, message:"Email exist in the db already..."})
      }else{
            const user = req.body;
            const NewUser = new User(user)
            const saveUser = await NewUser.save()
            res.json({sucess:true, message:"user saved to db.."})
      }
  }catch(error){
    res.status(400).json({sucess:false, message:"Not able to save the user in the db...", errorMessage :error.message})
  }
}

exports.get_single_user = async(req,res)=>{
       const {user} = req;
   res.json({sucess:true, message:"The user is..", user})
 }

exports.delete_user = async(req,res)=>{
     const {user} = req;
     await user.remove();
     res.json({sucess:true, message:"User is deleted from database..."})
 }

 exports.get_user_cart = async(req,res)=>{
  try{
    const {userId} = req.params;
    const user = await User.findById(userId).select("cart name").populate("cart.product")
    res.json({success:true,message:"User with cart populated is...", user})
  }catch{
    res.status(500).json({success:false, message:"User doesn't have items in cart....."})
  }
}

exports.add_item_to_cart = async(req, res)=>{ //ADD ITEM TO CART OF A PARTICULAR USER...
    try{
      const {userId} = req.params;
      const {_id} = req.body
      let user = await User.findById(userId);
      const ifIdExist = user.cart.find((item)=>item._id == _id)
      if(ifIdExist){
         return res.json({status:false, message:"Product already exist in cart so cant be added...."})
      }
        const update = user.cart.push({product:_id,_id:_id})
        user = extend(user,update)
        user = await user.save()
        res.json({sucess:true, user})
    }catch{
     res.status(500).json({success:false, message:"User doesn't have items in cart....."})
  }
}
exports.delete_item_from_cart = async(req,res)=>{ //DELETE ITEM FROM CART OF A PARTICULAR USER...
  try{
    const {userId} = req.params;
    const {_id} = req.body;
    const user = await User.findById(userId)
    user.cart.remove({_id :_id})
    await user.save()
    res.json({sucess:"item is deleted from the cart of the user...", user})
  }catch{
    res.status(500).json({sucess:false, message:"User doesn't have items in cart.."})
  }
}

exports.get_user_wishlist = async(req,res)=>{
  try{
    const {userId} = req.params
    const user = await User.findById(userId).select("wishlist name").populate("wishlist")
    res.json({sucess:true, message:"User with wishlist populated is..",user})
  }catch{
    res.status(500).json({sucess:false, message:"User doesn't have items in wishlist"})
  }
}

exports.add_item_to_wishlist = async(req,res)=>{ /// ADD ITEM TO WISHLIST FOR A PARTICULAR USER..
   try{
     const {userId} = req.params;
     const {_id} = req.body;
     let user = await User.findById(userId)
    const ifIdExist = user.wishlist.find((item)=>item._id == _id)
    if(ifIdExist){
      return res.json({status:false, message:"Product already exist in wishlist so cant be added...."})
    }
     const update = user.wishlist.push(_id)
     user = extend(user,update)
     user = await user.save()
     console.log("pushed to wish", user)
     res.json({sucess:true, message:"Product added to the wishlist user..",user})
   }catch{
          res.status(500).json({success:false, message:"User doesn't have items in wishlist....."})
   }
 }

 exports.delete_item_from_wishlist = async(req,res)=>{//DELETE ITEM FROM WISHLIST FOR A PARTICULAR USER...
  try{
    const {userId} = req.params;
    const {_id} = req.body;
    const user = await User.findById(userId);
    user.wishlist.remove(_id);
    await user.save()
   res.json({sucess:true, message:"product is deleted from wishlist"})
  }catch{
    res.status(500).json({sucess:false, message:"product is not deleted from wishlist"})
  }
}