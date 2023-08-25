import React from 'react'
import Product from '@/src/models/Product'
import { useState } from 'react'
import mongoose from 'mongoose'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {checkout} from '../checkoutpayment'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Slug = ({product}) => {
    const [data, setdata] = useState([product])
    const router=useRouter();
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [mobile, setmobile] = useState()
  const [price, setprice] = useState()
  const [address, setaddress] = useState()
  const handleChange=(e)=>{
    if(e.target.name=='name'){
    setname(e.target.value)
    }
    else if(e.target.name=='email'){
setemail(e.target.value)
  }
else if(e.target.name=='mobile'){
setmobile(e.target.value)
}
else if(e.target.name=='price'){
  setprice(e.target.value)
  }
  else if(e.target.name=='address'){
    setaddress(e.target.value)
    }
  }
const handleSubmit=async(e)=>{
  e.preventDefault();
  const data={name,email,mobile,price,address};
  let res=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
  },
  body:JSON.stringify(data),
})
let response=await res.json();
console.log(response)

setname('');
  setemail('');
  setmobile('')
  setprice('')
  setaddress('')
  toast.success('Your Order is Confirmed! Please Complete the Payment!', {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    
}
  return (
    <>
     <ToastContainer
    position="bottom-left"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    <h1 className='text-center font-bold text-3xl my-4'>Your Order Displayed Below! Please Confirm It With Providing Details!</h1>
    {data.map((item)=>{
       
      return  <div class="max-w-sm rounded overflow-hidden shadow-lg text-center m-auto mb-5 justify-center">
  <img className="w-full " src={item.img}  alt="Sunset in the mountains"/>
  <div class="px-6 py-4"/>
    <div class="font-bold text-xl mb-2">{item.title}</div>
    <p className="text-gray-700 text-base font-bold">
     {item.desc}
    </p>
    <p className='font-bold'>Rs{item.price}</p>
    <p className='font-bold'>Size:{item.size[0]}</p>
    <p className='font-bold'>Color:{item.color[0]}</p>
  </div>
    })}
    
  
       <div>
      <h1 className='text-center text-3xl font-bold'>Enter Details To Confirm Your Order</h1>
      <div className='container m-auto'>
      <section class="text-gray-600 body-font relative">
      <form method='POST' onSubmit={handleSubmit}>
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">Confirm Your Details</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Please Write Correct Address To Confirm Your Order.</p>
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
          
            <label htmlFor="name" class="leading-7 text-sm text-gray-600">Enter Your Full Name</label>
            <input onChange={handleChange} value={name} required type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label htmlFor="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input value={email} onChange={handleChange} type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label htmlFor="number" class="leading-7 text-sm text-gray-600">Mobile Number</label>
            <input value={mobile} onChange={handleChange} type="mobile" id="number" name="mobile" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label htmlFor="number" class="leading-7 text-sm text-gray-600">Total Price</label>
            <input disabled value={product.price} onChange={handleChange} type="mobile" id="number" name="price" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        
        <div class="p-2 w-full">
          <div class="relative">
            <label htmlFor="address" class="leading-7 text-sm text-gray-600">Address</label>
            <textarea value={address} onChange={handleChange} id="message" name="address" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div class="p-2 w-full">
          <button onClick={(()=>{
      checkout(
        {
          lineItems:[{price:"price_1Nir1ZSAFUNggSmfzJUtFSyG",quantity:1,
                      price:"price_1NhsvkSAFUNggSmfxNM4M1Mv",quantity:1
          }],
          successUrl:`${process.env.NEXT_PUBLIC_HOST}/?session_id={CHECKOUT_SESSION_ID}`,
          
        }
      )
     })} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Place Order and Proceed To Payment</button>
        </div>
        
        <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
          <a class="text-green-500">example@email.com</a>
          <p class="leading-normal my-5">49 Smith St.Saint Cloud, MN 56301
            
          </p>
          <span class="inline-flex">
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="ml-4 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="ml-4 text-gray-500">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a class="ml-4 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
  </form>
    </section>
    </div>
    </div>
    </>
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
  

export default Slug;
