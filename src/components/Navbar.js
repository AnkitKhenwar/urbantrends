import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {ImCross} from 'react-icons/im'
import {MdOutlineAccountCircle} from 'react-icons/md'
import { useRef } from 'react';
const Navbar = ({user,Logout}) => {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap sticky bg-green-500 p-6">
  <div className="flex items-center flex-shrink-0 text-white mr-6">
    <Link href={'/'}><img className='my-2' src='https://www.newzjunky.com/wp-content/uploads/logo.png' height={100} width={100}  /></Link>
    
  </div>
  <div className="block lg:hidden font-bold">
    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow">
      <Link href={'/'} className="block text-xl font-bold mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </Link>
      <Link href={'/about'} className="block mt-4 text-xl font-bold lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        About
      </Link>
      <Link href={'/tshirts'} className="block mt-4 text-xl font-bold lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        TShirts
      </Link>
       <Link href={'/hoodies'} className="block mt-4 text-xl  font-bold lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-2">
        Hoodies
      </Link>
       <Link href={'/sports'} className="block mt-4 font-bold text-xl lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-2">
        Sports OutFit
      </Link>
       <Link href={'/casual'} className="block mt-4 text-xl font-bold lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-2">
        Casual OutFit
      </Link>
      
    </div>
  </div>
  <div className="cart absolute right-0 top-4 mx-7 my-5 flex">
        {user.value && (
          <MdOutlineAccountCircle className="text-3xl cursor-pointer mx-4" />
        )}
        {!user.value && (
          <Link href={"/login"}>
            <button className="bg-green-500 text-white mx-4 px-2 py-2 text-sm rounded-md shadow-md border border-solid">
              LogIn
            </button>
          </Link>
        )}
        {user.value && 
          (<Link href={"/login"}>
            <button onClick={Logout}  className="bg-green-500 mx-2 text-white border-solid px-2 py-2 text-sm rounded-md">
              LogOut
            </button>
            </Link>)

          
        }
        {user.value && 
          (<Link href={"/order"}>
            <button   className="bg-green-500 mx-2 px-2 py-2 text-white border-solid  text-sm rounded-md">
              Orders
            </button>
            </Link>)
        }
        {user.value && 
          (<Link href={"/myaccount"}>
            <button  className="bg-green-500 mx-2 px-2 py-2 text-white border-solid  text-sm rounded-md">
              My Account
            </button>
            </Link>)
        }
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-3xl cursor-pointer"
        />
        </div>
   
          <div
        ref={ref}
        className="w-72 h-[100vh] sidebar absolute top-0 right-0 bg-green-100 px-8 py-10 transform transition-transform translate-x-full  ">
         <h2 className="font-bold text-xl">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <ImCross />
        </span>
      </div>
</nav>
    </div>
  )
}

export default Navbar;
