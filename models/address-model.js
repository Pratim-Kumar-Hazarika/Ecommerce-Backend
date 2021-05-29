const mongoose = require("mongoose");
const addressSchema = mongoose.Schema({
  city :{type:String,required:[true,"City is required"]},
  fullName :{
    type:String,
    required:[true,"Full Name is requires"]
  },
    phone: {
    type: Number,
    validate: {
      validator: function(v) {
        return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  pincode :{
    type :Number,
    min: [6, 'Pincode must be 6 numbers'],
   required:true
  },
  flatNo :{
    type :String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  country:{
    type:String,
    required:true
  },
  landmark:{
    type:String,
    required:true
  },
  addressType:{
    type:String,
    required:[true,"Type of address is needed"]
  }
});

const userAddress = mongoose.Schema({
  _id:{
    type :mongoose.Schema.Types.ObjectId,
    ref :"User",
    required:true
  },
  addresses :[addressSchema]
})
module.exports = mongoose.model("Address", userAddress);