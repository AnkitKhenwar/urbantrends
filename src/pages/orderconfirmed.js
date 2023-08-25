import React from "react";
import { useState,useEffect } from "react";
import mongoose from "mongoose";
import Product from "../models/Product";
const orderconfirmed = ({product}) => {
  console.log(product)
  const [number, setnumber] = useState()
  const [data, setdata] = useState([product])
  useEffect(()=>{
    setnumber(Math.floor(Math.random()*100)+267184128)
}, [])
  return (
    <>
    <h1 className="font-bold text-4xl ">
      Your Order is Confirmed With Order Id {number}
    </h1>
    
      <div class="max-w-sm rounded overflow-hidden shadow-lg text-center m-auto mb-5 justify-center">
  <img className="w-full " src={product.img}  alt="Sunset in the mountains"/>
  <div class="px-6 py-4"/>
    <div class="font-bold text-xl mb-2">{product.title}</div>
    <p className="text-gray-700 text-base font-bold">
     {product.desc}
    </p>
    <p className='font-bold'>Rs{product.price}</p>
    <p className='font-bold'>Size:{product.size[0]}</p>
    <p className='font-bold'>Color:{product.color[0]}</p>
  </div>
    
    
    </>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ desc: context.query.desc });
  return {
     props: {product: JSON.parse(JSON.stringify(product))}
  };
}

export default orderconfirmed;
