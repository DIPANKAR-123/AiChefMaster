/* eslint-disable react/prop-types */
import React from 'react'


const Overview = ({form}) => {
    console.log(form.dishName)
  return (
    <div className='w-full h-full  font-primary  text-white py-10 px-16'>
     
      <div className=''>
       <div className='flex items-center gap-4 border-b border-zinc-700'><p className='p-1  py-2 font-semibold text-xl'>Dish Name - </p> <span className='text-lg '>{form.name}</span></div>
       <div className='flex items-center gap-4 border-b border-zinc-700'><p className='p-1  py-2 font-semibold text-xl'>Veg or Non-veg - </p><span className='text-lg '>{form.veg_non_veg}</span></div>
       <div className='flex items-center gap-4 border-b border-zinc-700'><p className='p-1 py-2 font-semibold text-xl'>Popularity state - </p><span className=' text-lg'> {form.popularity_state}</span></div>
       <div className='flex items-center gap-4 border-b border-zinc-700'><p className='p-1  py-2 font-semibold text-xl'>Cuisine -  </p> <span className='text-lg '> {form.cuisine}</span></div>
       <div className='flex items-center gap-4 border-b border-zinc-700'><p className='p-1  py-2 font-semibold text-xl'>Course Type - </p><span className='text-lg '> {form.course_type}</span></div>
       <div className='flex items-center gap-4 border-b border-zinc-700'><p className='p-1 py-2 font-semibold text-xl'>Cooking time - </p><span className=' text-lg'>{form.cooking_time}</span></div>
       
        {form.ingredients && (
        <div className="p-1 border-b border-zinc-700 py-2 flex gap-4">
        <p className=" font-semibold text-xl">Ingredients - </p>
        <ul className='flex gap-4'>
          {form.ingredients.map((ingredient, index) => (
            <li className='text-lg' key={index}>{ingredient.name}-{ingredient.quantity}</li>
          ))}
        </ul>
      </div>
      )}
        {form.instructions && (
        <div className="p-1 py-2 border-b border-zinc-700">
        <p className=" font-semibold text-xl">Instructions - </p>
        <ul className='flex flex-col gap-1 py-4'>
          {form.instructions.map((instruction, index) => (
            <li className='text-lg break-all flex gap-1' key={index}> <p>{index+1}</p> <p>. </p><p className='
            px-2'> {instruction.step}</p></li>
          ))}
        </ul>
      </div>
      )}

      </div>

    
    
    </div>
  )
}

export default Overview
