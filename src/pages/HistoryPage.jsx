import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail, AiOutlineClockCircle, AiOutlineCalendar } from "react-icons/ai";
import {  IoIosClose, } from "react-icons/io";
import Overview from '../components/Overview';
import CircularProgress from '@mui/material/CircularProgress';

const History = () => {
  const [dishes, setDishes] = useState([]);
  const { user } = useAuthContext();
  const [filterCuisine, setFilterCuisine] = useState("all"); // Use [variableName, setterFunction] syntax
  const [open, setOpen] = useState(false);
  const [dishView, setDishView] = useState({});

  const handleClick = async(id)=>{
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/dish/filter/${id}/id/`, {
        method: "GET",
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Dish fetched successfully:", responseData);
        setOpen((prev) => !prev);
        setDishView(responseData);
        
      } else {
        const errorData = await response.json();
        console.error("Error fetching dish:", response.statusText);
      }

    }catch(err){
      console.log('Error :',err);
    }
    
  }
    

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}api/chef/${user.account_id}/dishes/`;

        const response = await fetch(apiUrl, {
          method: 'GET',
        });

        if (!response.ok) {
          console.log("Error");
        }

        const data = await response.json();
        setDishes(data.dishes);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDishes();
  }, [filterCuisine]);

  const handleFilterChange = (event) => {
    // Update the filter value when the select input changes
    setFilterCuisine(event.target.value);
  };

  return (
    <div className='min-h-screen w-screen flex flex-col mt-32 items-center font-primary text-white'>
      <p className='text-5xl font-semibold'>History</p>
      <p className='text-2xl font-medium py-4'>List of dishes created by you</p>
       {/* Filter select input */}
       <select className='bg-black text-white' value={filterCuisine} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="Indian">Indian</option>
        <option value="Chinese">Chinese</option>
        {/* Add more filter options as needed */}
      </select>
      <div className='  flex w-screen justify-center '>
      <div className=' grid grid-cols-1 lg:grid-cols-3 gap-8 items-center rounded-xl  p-2 lg:p-6 '>
        {dishes.length > 0 ? dishes.map((dish, index) => {
          // Parse the date string to a JavaScript Date object
          const createdDate = new Date(dish.created_at);

          // Format the date and time
          const formattedDate = createdDate.toLocaleDateString();
          const formattedTime = createdDate.toLocaleTimeString();
          if (filterCuisine === 'all' || dish.cuisine === filterCuisine) {
            return (
              <div index={index} onClick={()=>handleClick(dish.id)} className='border shadow-black shadow-xl w-[100%] flex gap-4 justify-between bg-[#1f1f1f64] hover:bg-[#3f3f3f64] items-center rounded-xl border-zinc-700 p-2 px-4 ' key={index}>
                <div className='flex flex-col'>
                 <div className='flex items-center gap-2 py-2'><p className='text-zinc-300'>#{dish.id}</p><p className='text-xl md:text-2xl font-medium'>{dish.name}</p></div> 
                  <div className=' '>
                  <p className=' '>{dish.course_type}</p>
                  <p className=''>{dish.cuisine}</p>
                  </div>
                </div>
                
                <div className='flex'>
                  <div className='flex flex-col items-start gap-2'> <div className='flex gap-2 items-center'><AiOutlineClockCircle className='text-amber-500'/>{formattedTime} </div> <div className='flex gap-2 items-center'><AiOutlineCalendar className='text-indigo-500'/>{formattedDate}</div></div>
                </div>
              </div>
            );
          }
          return null; // Hide dishes that don't match the filter
        }):(
          
            <div className='flex flex-col min-w-screen  justify-center items-center'><CircularProgress color="inherit" className='w-[300px]' /></div>
          
        )}
         
         <div className={'popup-media transition-all  w-full max-auto justify-center ' } style={{display: open?'flex':'none'}}>
            <span onClick={(prev)=>setOpen(!prev)} className='absolute cursor-pointer right-0 p-8'><IoIosClose className="text-rose-600 border border-rose-600 rounded-full hover:bg-[#361316] text-3xl" /></span>
            {open && <Overview form={dishView}/>}
    </div> 
        
      </div>
      </div>
    </div>
  );
}

export default History;
