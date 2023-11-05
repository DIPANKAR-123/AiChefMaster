import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";

const History = () => {
  const [dishes, setDishes] = useState([]);
  const { user } = useAuthContext();
  const [filterCuisine, setFilterCuisine] = useState(""); // Use [variableName, setterFunction] syntax


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
      <div className='w-1/2 border bg-gradient-to-b relative from-zinc-950 to-black items-center rounded-xl border-zinc-700 p-6 my-8'>
        {dishes && dishes.map((dish, index) => {
          // Parse the date string to a JavaScript Date object
          const createdDate = new Date(dish.created_at);

          // Format the date and time
          const formattedDate = createdDate.toLocaleDateString();
          const formattedTime = createdDate.toLocaleTimeString();
          if (filterCuisine === 'all' || dish.cuisine === filterCuisine) {
            return (
              <div className='border flex gap-4 justify-between bg-zinc-950 items-center rounded-xl border-zinc-700 p-2 my-3' key={index}>
                <div className='flex flex-col'>
                  <p>{dish.name}</p>
                  <p>{dish.course_type}</p>
                  <p>{dish.cuisine}</p>
                </div>
                <div>
                  <p>{formattedDate} {formattedTime}</p>
                </div>
              </div>
            );
          }
          return null; // Hide dishes that don't match the filter
        })}
          
        
      </div>
    </div>
  );
}

export default History;
