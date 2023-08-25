import User from "@/src/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler=async(req,res)=>{
    console.log(req.body);
    const {name,email}=req.body;
    if(req.method=='POST'){
        let u=new User({name, email, password:CryptoJS.AES.encrypt(req.body.password, "secret123").toString()});
        await u.save();
        res.status(200).json({success:"Success"})
    }
    else{
        res.status(400).json({error:"Bad Request!"})
    }
}
export default connectDb(handler);