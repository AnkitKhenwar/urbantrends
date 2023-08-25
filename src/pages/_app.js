
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LoadingBar from 'react-top-loading-bar'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
export default function App({ Component, pageProps }) {
  const router=useRouter();
  const [progress, setProgress] = useState(0)
  const [user, setuser] = useState({value:null})
  const [key, setkey] = useState(0)
  useEffect(() => {
    router.events.on('routeChangeStart',()=>{
      setProgress(100)
    })
    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
    }
    const token=localStorage.getItem('token');
    if(token){
      setuser({value:token})
      setkey(Math.random())
    }
  }, [router.query]);
  const logout=()=>{
    localStorage.removeItem('token');
    setuser({value:null})
    setkey(Math.random())
  }
  
  return <>
   <LoadingBar
        color='#7cfc00'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
  <Navbar user={user} key={key} Logout={logout}/>
  <Component {...pageProps} />
  <Footer/>
  </>
}
