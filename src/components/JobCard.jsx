import React from 'react'
import '../styling/CardPage.css'
import { IoLocationSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
function JobCard({id,image,info,type,name,location,duration,stipend}) {
    console.log(id);
  return (
    <NavLink  to='/jobform'>
    <div  className='cardcss gap-1 text-black'>
        <div className='flex items-center justify-around  '>
        <img src={image} width={4}  className='image' alt="" ></img>
        <div className='flex flex-col justify-center '>

          <div className='font-serif'>{name}</div>
          <div className='flex font-semibold items-center justify-between mt-2'>
          <div className=' '>{location}</div>
          <IoLocationSharp />
          </div>
        </div>
        </div>
        <div>

        <div className=" w-[400px] mt-3 font-semibold flex justify-around items-center ">
          <h4 className=' '> ₹ {stipend}/m</h4>
          <h4 className=''> {type}</h4>
          <h4 className=''>{duration}</h4>
        </div>
        

        </div>

    </div>
    </NavLink>
  )
}

export default JobCard