
// const  mongoose = require('mongoose');
// const  Schema = mongoose.Schema;


// var userSchema = new Schema({
//   fullName: {
//     type: String,
   
//   },
//   email: {
//     type: String,
   
//    },
 
 
//   password: {
//     type: String,
  
//   },
//   totalamount:{
//     type:Number,
//   },
//   crypto:{
//      type:Map,
//      of:Object,
//   }

// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalamount: {
    type: Number,
    default: 0, 
  },
  crypto: [
    {
      name:{
      type:String,
      required:true,
      },
      symbol: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
     
      link: {
        type: String,
        required: true,
      },

      date:{
        type:Date,
        required:true,
      },
      time:{
        type:String,
        required:true,
      },
    },
  ],
  pre:{
    type:Object,
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
