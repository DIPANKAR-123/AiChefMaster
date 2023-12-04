import React from 'react'
import "../styling/SearchBar.css"
import { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
function SearchBar() {
    const [isActive,setIsActive]=useState(false);
    const [isJobActive,setIsJobActive]=useState(false);
    const [isLocationActive,setIsLocationActive]=useState(false);
    const [isDurationActive,setIsDurationActive]=useState(false);
    const [selected,setSelected]=useState({"Job Type":"Job Type","Location":"Location","Duration":"Duration"});
    const options =[["Intern","Full Time"],["Remote","In Office"],["3 Months ","6 Months","Contract"]];

    console.log(selected);
  return (
    <div className='flex  mb-24 w-full mx-4 justify-between items-center bg-white  px-2 z-[1000] gap-x-4 '>
        <div className='dropdown w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div onClick={e=>setIsJobActive(!isJobActive)} className='flex px-4 w-[1/5] bg-[#F5F7FA] text-white items-center justify-between'>
            <div className='dropdown-btn font-bolder' >{selected['Job Type']}</div>
            <IoMdArrowDropdown color='blue'  size={30}/>
            </div>
            
           {isJobActive && (            
           <div className='dropdown-content w-full'>
            {
                options[0].map((option)=>(
                  <div onClick={(e)=>{
                    setSelected({...selected,"Job Type":option});
                    setIsJobActive(false);
                  }}
                   className='dropdown-item' >
                    {option}
                  </div>
                ))}
            
            </div>)}
        </div>
       <div className='dropdown w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div onClick={e=>setIsLocationActive(!isActive)} className='flex px-4 w-[1/5] bg-[#F5F7FA] text-white items-center justify-between'>
            <div className='dropdown-btn font-bolder' >{selected['Location']}</div>
            <IoMdArrowDropdown color='blue'  size={30}/>
            </div>
            
           {isLocationActive && (            
           <div className='dropdown-content w-full'>
            {
                options[1].map((option)=>(
                  <div onClick={(e)=>{
                    setSelected({...selected,"Location":option});
                    setIsLocationActive(false);
                  }}
                   className='dropdown-item' >
                    {option}
                  </div>
                ))}
            
            </div>)}
        </div>
        <div className='dropdown w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div onClick={e=>setIsDurationActive(!isDurationActive)} className='flex px-4 w-[1/5] bg-[#F5F7FA] text-white items-center justify-between'>
            <div className='dropdown-btn font-bolder' >{selected["Duration"]}</div>
            <IoMdArrowDropdown color='blue'  size={30}/>
            </div>
            
           {isDurationActive && (            
           <div className='dropdown-content w-full'>
            {
                options[2].map((option)=>(
                  <div onClick={(e)=>{
                    setSelected({...selected,"Duration":option});
                    setIsDurationActive(false);
                  }}
                   className='dropdown-item' >
                    {option}
                  </div>
                ))}
            
            </div>)}
        </div>
        <div className='dropdown w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div onClick={e=>setIsActive(!isActive)} className='flex px-4 w-[1/5] bg-[#F5F7FA] text-white items-center justify-between'>
            <div className='dropdown-btn font-bolder' >Search</div>
            <FaSearch color='green' size={30} />
            {/* <IoMdArrowDropdown color='blue'  size={30}/> */}
            </div>
            
           {/* {isActive && (            
           <div className='dropdown-content w-full'>
            {
                options.map((option)=>(
                  <div onClick={(e)=>{
                    setSelected(option);
                    setIsActive(false);
                  }}
                   className='dropdown-item' >
                    {option}
                  </div>
                ))}
            
            </div>)} */}
        </div> 
       
    </div>
  )
}

export default SearchBar