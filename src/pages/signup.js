import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

const Signup = () => {
    const router=useRouter();
  const [name, setname] = useState()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const handleChange=(e)=>{
    if(e.target.name=='name'){
    setname(e.target.value)
    }
    else if(e.target.name=='email'){
setemail(e.target.value)
  }
else if(e.target.name=='password'){
setpassword(e.target.value)
}
  }
const handleSubmit=async(e)=>{
  e.preventDefault();
  const data={name,email,password};
  let res=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
  },
  body:JSON.stringify(data),
})
let response=await res.json();
console.log(response)

  setemail('');
  setname('');
  setpassword('');
  toast.success('Your Account is Created!', {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
setTimeout(()=>{
router.push(`${process.env.NEXT_PUBLIC_HOST}`);
},2000)
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
   
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://www.codeswear.com/codeswearcircle.png" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to your account</h2>
    <Link href={"/login"}><h2 className='font-medium text-green-500 text-center hover:text-green-500'>Login</h2></Link>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="space-y-6"  method="POST">
    <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div className="mt-2">
          <input value={name} onChange={handleChange} id="name" name="name" type="text" autocomplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" placeholder='Enter Your Full Name'/>
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input value={email} onChange={handleChange} id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" placeholder='Enter Your Email Address'/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <Link href={"/forgot"} className="font-semibold text-green-600 hover:text-green-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input value={password} onChange={handleChange} id="password" name="password" type="password" autocomplete="current-password" required className="block cursor-move w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" placeholder='Enter Your Password(Min:8 Characters)' minLength={8} />
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign Up</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" className="font-semibold leading-6 text-green-600 hover:text-green-500">Start a 14 day free trial</a>
    </p>
  </div>
</div>
</>
  )
}


export default Signup
