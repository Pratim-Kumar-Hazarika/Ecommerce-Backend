// const mongoose = require('mongoose');

// async function intializeConnectionToDb() {
//   const uri ="mongodb+srv://pratimHazarika:pratimMongoDb@neog-cluster.zwegs.mongodb.net/ecommerce"
//   try{
//     await  mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
//     console.log("Connection established succesfully");
//   }catch(error){
//     console.log(error);
//     console.log("Error in establising the connection");
//   }
// }

// module.exports ={ intializeConnectionToDb };
const mongoose = require('mongoose');

async function intializeConnectionToDb() {
  const uri ="mongodb+srv://pratimHazarika:pratimMongoDb@neog-cluster.zwegs.mongodb.net/ecommerce"
  try{
    await  mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true,useFindAndModify:true})
    console.log("Connection established succesfully");
  }catch(error){
    console.log(error);
    console.log("Error in establising the connection");
  }
}

module.exports ={ intializeConnectionToDb };