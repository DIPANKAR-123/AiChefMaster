import React from 'react'
import {AiOutlineSearch} from "react-icons/ai"
import DishResultCard from '../components/DishResultCard'
import { useState } from 'react'
import Message from '../components/Message'
import { AiOutlineClose } from "react-icons/ai";

const SearchPage = () => {

    const [query, setQuery] = useState("");
    const [resultDishes, setresultDishes] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setisLoading] = useState(false)
    const [errormsg, setErrormsg] = useState("");
    const [open, setOpen] = useState(false);

    const handleFormSubmit = async(e) =>{
        e.preventDefault();
        setisLoading(true);
        const reqbody = {
            'query':query
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}api/dish/filter/search/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(reqbody),
              });
          
              if (response.ok) {
                setQuery("")
                const responseData = await response.json();
                setresultDishes(responseData.data)
                setErrormsg("")
                setisLoading(false);
                setMessage (responseData.message) ;
                console.log("Dish found", responseData);
              } else {
                setQuery("")
                setisLoading(false);
                setresultDishes([])
                setMessage("")
                const errorData = await response.json();
                console.error("Error :", response.statusText);
                setErrormsg ("Dish does not exist.") ;
              }

        }catch(err){
            setQuery("")
            setisLoading(false);
            console.error("An error occurred:", err);
        }
    }

    const handleInputChange = (e) => {
        setQuery(e.target.value); 
    }

    const showDish=()=>{
        setOpen((prev) => !prev);
    }

  return (
    <div className="mt-20 font-primary w-full min-h-screen flex flex-col text-white  items-center"> {/* Add 'items-center' to center horizontally */}
    <form onSubmit={handleFormSubmit} className="py-8 w-full flex text-center flex-col justify-center items-center">
        <p className=' text-2xl lg:text-4xl font-semibold py-8'>AiChefMaster Search </p>
        <p className='w-[90%] lg:w-1/2 italic text-sm text-zinc-300 font-medium pb-8'>*Prior to adding a new dish, we kindly request that you perform a quick search to ensure it doesn't already exist in our database.</p>
      <input
        type="text"
        name="dish_search"
        required={true}
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a dish..."
        className="w-[90%] lg:w-1/2 border px-4 py-2 text-white text-lg bg-black border-slate-500 rounded-full placeholder-italic outline-none focus:border-orange-400"
      />
      <button className={`${isLoading ? 'cursor-wait' : 'cursor-pointer'} text-white py-2 border bg-zinc-900 hover:bg-zinc-950 border-zinc-600 my-4 rounded-md flex px-4 items-center gap-2`}>
        Search <AiOutlineSearch />
      </button>
    </form>
  
    {/* RESULTS CARDS */}
    {message && <Message message={message} color="bg-[#0f83053e]" border="border border-emerald-600"/>}
    {errormsg && <Message message={errormsg} color="bg-[#cd1d1d2c]" border="border border-rose-600"/>}
    
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-8 xl:grid-cols-4 gap-8'>
    {resultDishes.length > 0 && (
    resultDishes.map((dish, index) => (
    <DishResultCard onClick={showDish} key={index} dish={dish} />
    
  ))
)}
</div>
  </div>
  
  )
}

export default SearchPage