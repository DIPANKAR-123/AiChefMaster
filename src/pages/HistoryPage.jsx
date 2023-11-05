import React from 'react'
import { useState, useEffect } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";

const History = () => {
  const [dishes, setDishes] = useState([]);
  const chefId = '2'; 
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}api/chef/1/dishes/`;
  
        const response = await fetch(apiUrl, {
          method: 'GET',
        });
  
        if (!response.ok) {
          console.log("Error");
        }
  
        const data = await response.json();
        setDishes(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchDishes();
  }, []);
  

  return (
    <div className='h-screen w-screen flex flex-col mt-20 text-white'>History</div>
  )
}

export default History