import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {BiShow} from 'react-icons/bi'
import {MdOutlineVisibilityOff} from 'react-icons/md'
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from '../hooks/useAuthContext';
import toast, {Toaster} from 'react-hot-toast'


const LoginPage = () => {
  const {user} = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const{login, error,  isLoading, } = useLogin()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await login(email, password);
    toast.success("Logged in")
    
    
    
  }
  return (
    <div className='px-4 sm:px-4  pt-16'>
      <form className='signup  flex flex-col  justify-center z-10 items-center text-white font-primary' onSubmit={handleSubmit}>
      <h3 className='text-3xl font-semibold  mt-16  text-center  py-2'>Welcome, log in to you account</h3>
      <p className='text-center mb-8 text-base text-zinc-300'>Enter the fields below to continue</p>
      
      
        <div className=' bg-gradient-to-b from-zinc-600 to-black p-0.5  rounded-lg'>

        <div className=' bg-gradient-to-b relative from-zinc-950 to-black backdrop-filter backdrop-blur-xl h-full w-full items-center p-4  back md:p-16 rounded-lg flex flex-col justify-center'>
        <div className='w-[300px] h-[300px]  rounded-full absolute top-[-40px] left-[-40px] blur-3xl z-[-10] bg-[#1439b329]  '></div>
        
        
        
        <div className='flex md:gap-4 flex-col md:flex-row min-w-full'>
        <div className='my-4 min-w-full'>
        <label>Email</label>
        <input type="email"
        className='block min-w-full py-2 placeholder:italic px-4 my-2 border border-zinc-600 rounded-lg bg-black'
        placeholder='abc@gmail.com'
        onChange={(e)=>setEmail(e.target.value)} 
        value={email}
        required={true}
        />
        
        </div>
        </div>


        <div className='flex md:gap-4 flex-col md:flex-row'>

        <div className='my-4'>
        <label>Password</label>
        <div className='relative'>
        <input type={showPw? 'text':'password'}
        className='block w-[300px] py-2 px-4 placeholder:italic my-2 border border-zinc-600 rounded-lg bg-black'
        placeholder='Password'
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        required={true}
        />
        <BiShow className={` ${showPw ? 'hidden' : 'flex'} absolute top-3 right-4 cursor-pointer`} onClick={()=>{setShowPw(!showPw)}} />
        <MdOutlineVisibilityOff className={` ${showPw ? 'flex' : 'hidden'} absolute top-3 right-4 cursor-pointer`} onClick={()=>{setShowPw(!showPw)}}/>
        </div>
        </div>
        
        </div>

        {error && <div className='text-rose-600 border-l-2 border-r-2 w-full text-sm rounded border-rose-800 text-center  bg-[#ab2c2c2a] to-transparent  px-4 py-2'>{error}</div>}
        {user && <div className='text-emerald-600 border-l-2 border-r-2 w-full text-sm rounded border-emerald-800 text-center  bg-[#2cab392a] to-transparent  px-4 py-2'>You are currently logged in</div>}

        <button disabled={isLoading} className="get-started group relative md:w-1/2 px-8 py-3 overflow-hidden font-medium rounded-xl border border-yellow-800  text-xl  shadow-2xl shadow-[#ff910025]  my-8">
      <div className="absolute inset-0 w-0 bg-[#ff910032] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
      <span className=" text-white">Log In</span>
      </button>

      <p className='text-center text-zinc-300 '>Don't have an account ? <Link to='/signup'>
      <button className='border rounded-xl px-4 py-1 mx-2 font-medium bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-zinc-950 relative max-w-md overflow-hidden  border-zinc-700   bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1200ms]'>Sign up</button>
      </Link></p>
        
        </div>

        </div>
    </form>
    <Toaster   position="top-right"
  reverseOrder={false}/>
    </div>
  )
}

export default LoginPage