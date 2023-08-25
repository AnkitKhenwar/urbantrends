import Order from '../../models/Order'
import connectDb from "@/middleware/mongoose";

const handler=async(req,res)=>{
    if(req.method=='POST'){
        console.log(req.body)
        let o=new Order({
    name:req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    price: req.body.price,
    address:req.body.address
        })
        await o.save();
        res.status(200).json({success:"Success"})
    }
    else{
        res.status(400).json({error:"Bad Request!"})
    }
}
    
export default connectDb(handler);