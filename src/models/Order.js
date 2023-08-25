const mongoose = require('mongoose');
const { Schema } = mongoose;
const OrderSchema = new mongoose.Schema({
    name: {type:String,unique:true},
    email: {type:String},
    mobile: {type:Number},
    address: {type:String}

  },{timestamps:true});

  mongoose.models={}

  export default mongoose.model("Order",OrderSchema);