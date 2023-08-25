import React from 'react'
import mongoose from 'mongoose'
import Product from '../models/Product'
import Link from 'next/link'
const hoodies = ({products}) => {
  return (
    <div className=' container m-auto'>
      <h1 className='text-center text-4xl my-2 font-bold'>Explore Our Casual Collection</h1>
    <p className='text-center my-2'>Stay warm and stylish with the wide selection of hoodies available at Codeswear.com. Our hoodies are perfect for every occasion, whether you're looking for a casual everyday hoodie or something to wear to the gym. We have a variety of styles to choose from, including coding hoodies, anime hoodies, and casual hoodies for everyday wear. All of our hoodies are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect hoodie for you!</p>
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
    {Object.keys(products).map((item)=>{
     return <div className="lg:w-1/5 md:w-1/2 p-4 w-full ">
     <Link href={`/product/${products[item].slug}`} className='block relative h-48 rounded overflow-hidden'>
          <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={products[item].img}/>
        </Link>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
          <p className="mt-1">{products[item].desc}</p>
          <p className="mt-1">Rs{products[item].price}</p>
         <button className='mt-1 bg-green-500 p-2 text-white my-1'>Buy Now</button>
        </div>
        </div>
    })}
   </div>
   </div>
    </section>
    </div>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "hoodies" });
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}


export default hoodies
