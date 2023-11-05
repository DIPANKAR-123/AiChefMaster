import React, { useState, useEffect } from 'react'
import {BiLogoLinkedinSquare} from 'react-icons/bi'
import Button_1 from '../components/Button_1'
import {  toast } from 'react-toastify';
const ContactPage = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/contact/`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          name,
          message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        setError(json.error);
        setIsLoading(false);
        toast.error(error, {
          theme: 'dark',
          position: 'bottom-right',
        });
      }
  
      if (response.ok) {
        setIsLoading(false);
        setEmail('')
        setMessage('')
        setName('')
        toast.success(json.message, {
          theme: 'dark',
          position: 'bottom-right',
        });
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className=' pt-32 flex flex-col overflow-x-hidden max-w-screen md:flex-row gap-8  h-screen font-primary justify-center items-center px-8'>

      <div className='text-white mt-40 md:mt-0 md:my-0'>
        <h2 className='text-3xl md:text-5xl font-semibold my-4 text-transparent  bg-clip-text bg-gradient-to-b from-white to-zinc-800'>
        Your feedback <br /> helps us improve 
        </h2>
        <div className='text-zinc-300'>
        <p>We are here to help you and we'd love to connect with you.</p>

        <p>We'll get back in 24h.</p>
        </div>
        
        
      </div>

      <div className='w-full md:w-1/2'>
      <form
      onSubmit={handleSubmit}
       className='signup  flex flex-col  justify-center  items-center text-white font-primary w-full ' >
      
      
      
        <div className=' bg-gradient-to-b from-zinc-600 to-black p-0.5  rounded-lg w-full md:w-2/3'>

        <div className=' bg-gradient-to-b relative from-zinc-950 to-black backdrop-filter backdrop-blur-xl h-full w-full items-center p-4  back md:p-8 rounded-lg flex flex-col justify-center'>
        <div className='w-[400px] h-[400px]  rounded-full absolute top-[-40px] left-[-40px] blur-3xl z-[-10] bg-[#14318629]  '></div>
        
        
        
        <div 
        className='flex md:gap-4 flex-col  items-center min-w-full'>

        <div className='my-2 min-w-full'>
        <label>Name</label>
        <input type="text"
        className='block min-w-full py-2 placeholder:italic px-4 my-2 border border-zinc-600 rounded-lg bg-black'
        placeholder='Full Name'
        name="name"
        onChange={(e)=>setName(e.target.value)} 
        value={name}
        required={true}
        />
        </div>

        <div className='my-2 min-w-full'>
        <label>Email</label>
        <input type="email"
        name="email"
        className='block min-w-full py-2 placeholder:italic px-4 my-2 border border-zinc-600 rounded-lg bg-black'
        placeholder='abc@gmail.com'
        onChange={(e)=>setEmail(e.target.value)} 
        value={email}
        required={true}
        />
        </div>

        <div className='my-2 min-w-full'>
        <label>Message</label>
        <textarea type="textarea"
        name="message"
        className='block min-w-full  min-h-[200px] py-2  placeholder:italic px-4 my-2 border border-zinc-600 rounded-lg bg-black'
        placeholder='Type your message...'
        onChange={(e)=>setMessage(e.target.value)} 
        value={message}
        required={true}
        />
        </div>
        <Button_1 isLoading={isLoading} className={isLoading ? 'cursor-wait' : 'cursor-default'} name={'Send Message'} />

        </div>


       

        

      

      
        </div>

        </div>
    </form>
      </div>

    </div>
  )
}

export default ContactPage