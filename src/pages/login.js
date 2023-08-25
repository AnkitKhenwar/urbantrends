
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
const Login = () => {
  const Router=useRouter()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const handleChange=(e)=>{
     if(e.target.name=='email'){
setemail(e.target.value)
  }
else if(e.target.name=='password'){
setpassword(e.target.value)
}
  }
const handleSubmit=async(e)=>{
  e.preventDefault();
  const data={email,password};
  let res=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
  },
  body:JSON.stringify(data),
})
let response=await res.json();
console.log(response)

  setemail('');
  setpassword('');
  if(response.success){
    localStorage.setItem('token',response.token);
toast.success('You are Succesfully Logged In!', {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    setTimeout(()=>{
      Router.push(`${process.env.NEXT_PUBLIC_HOST}`)
    },2000)
   
  }
  else{
    toast.error(response.error, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  }
  

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
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://www.codeswear.com/codeswearcircle.png" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    <Link href={"/signup"}><h2 className='font-medium text-green-500 text-center hover:text-green-500'>Sign Up</h2></Link>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="space-y-6"  method="POST">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input value={email} onChange={handleChange} id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" placeholder='Enter Name'/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <Link href={'/forgot'} className="font-semibold text-green-600 hover:text-green-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input onChange={handleChange} value={password} id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" placeholder='Enter Password(Min-8 Characters)'/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Login</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" className="font-semibold leading-6 text-green-600 hover:text-green-500">Start a 14 day free trial</a>
    </p>
  </div>
</div>
    </div>
    </>
  )
}

export default Login
