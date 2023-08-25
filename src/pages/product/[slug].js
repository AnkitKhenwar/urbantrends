import React from 'react'
import Product from "@/src/models/Product";
import { useState,useEffect } from "react";
import mongoose from "mongoose";
import Link from 'next/link';


const Slug = ({product,products}) => {
  console.log(product)
  const [data, setdata] = useState([product])
  console.log(data);
  const [pin, setpin] = useState();
  const [service, setservice] = useState();
  const checkservice = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pin`);
    let pinjson = await pins.json();
    if (pinjson.includes(parseInt(pin))) {
      setservice(true);
    } else {
      setservice(false);
    }
  };

  const OnchangePin = (e) => {
    setpin(e.target.value);
  };
    
  return (
    
    <section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
      
      {data.map((item)=>{
        return <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">{item.title}</h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{item.desc}</h1>
          <div className="flex mb-4">
            <a className="flex-grow text-green-500 border-b-2 border-green-500 py-2 text-lg px-1">Description</a>
          </div>
          <p className="leading-relaxed mb-4">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.</p>
          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Color</span>
            <span className="ml-auto text-gray-900">{item.color}</span>
          </div>
          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Size</span>
            <span className="ml-auto text-gray-900">{item.size}</span>
          </div>
          <div className="flex border-t border-b mb-6 border-gray-200 py-2">
            <span className="text-gray-500">Quantity</span>
            <span className="ml-auto text-gray-900">{item.availableQty}</span>
          </div>
          <div className="flex">
            <span className="title-font font-medium text-2xl text-gray-900">Rs{item.price}</span>
          <Link href={`/order/${item.slug}`}><button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Buy Now</button>
          </Link>
          </div>
          <div className="pin flex">
                <input
                  type="text"
                  className="px-2 border-2 border-gray-400"
                  onChange={OnchangePin}
                  placeholder="Enter Your Pin Code"
                />
                <button
                  className="flex ml-5 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                  onClick={checkservice}
                >
                  Check
                </button>
              </div>
              {!service && service != null && (
                <div className="text-red-700 mt-3">
                  Sorry! We do not deliver to this Pincode.
                </div>
              )}
              {service && service != null && (
                <div className="text-green-700 mt-3">
                  Yay! This Pincode is Serviceable.
                </div>
              )}
          
        </div>
         
        
        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={item.img}/>
        </div>
        
      })}
        
      </div>
  </section>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  return {
     props: {product: JSON.parse(JSON.stringify(product))}
  };
}



export default Slug
