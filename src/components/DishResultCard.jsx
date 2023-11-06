import React from 'react'
import { useState, useEffect } from 'react';
import {  IoIosClose, } from "react-icons/io";
import Overview from './Overview';

const DishResultCard = ({dish}) => {
    const [open, setOpen] = useState(false);
    const [dishView, setDishView] = useState({});

    const showDish = () => {
        setOpen((prev) => !prev);
        setDishView(dish); // Update dishView with the current dish prop
        console.log(dishView)
    };


    
     

  return (
    <div className="w-[300px] flex flex-col gap-3 rounded-xl  px-8 py-6 text-lg md:text-xl bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-zinc-950   border-zinc-700 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1200ms] text-white p-6 border  shadow-black">
    <h3 className="text-2xl text-amber-600 font-semibold">{dish.name}</h3>
    <div className='text-base'>

    <p>Course Type - {dish.course_type}</p>
    <p>Cuisine - {dish.cuisine}</p>
    {dish.veg_non_veg === "vegetarian" ? <p className='rounded-xl bg-[#0f83053e] my-1 text-center w-1/2 border p-0.5 border-emerald-500'>{dish.veg_non_veg}</p> : <p className='rounded-xl bg-[#cd1d1d2c] p-0.5 text-center w-1/2 border my-1 border-rose-500'>{dish.veg_non_veg}</p>}
    </div>

    <button onClick={showDish} className='text-base bg-black hover:bg-zinc-900 border border-zinc-700 p-2 rounded-xl'>See more</button>
   
    <div className={'popup-media transition-all min-h-screen  w-full max-auto justify-center ' } style={{display: open?'flex':'none'}}>
            <span onClick={(prev)=>setOpen(!prev)} className='absolute cursor-pointer right-0 p-8'><IoIosClose className="text-rose-600 border border-rose-600 rounded-full hover:bg-[#361316] text-3xl" /></span>
            {open && <Overview form={dishView}/>}
    </div>
    
  </div>
  )
}

export default DishResultCard