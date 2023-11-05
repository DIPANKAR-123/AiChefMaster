import React from 'react'

const DishResultCard = ({dish}) => {

  return (
    <div className="w-[300px]  rounded-xl px-8 py-3 text-lg md:text-xl bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-zinc-950 relative   border-zinc-700 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1200ms] text-white p-6 border flex flex-col shadow-black">
    <h3 className="text-2xl text-amber-600 font-semibold">{dish.name}</h3>
    <div className='text-base'>

    <p>{dish.course_type}</p>
    <p>{dish.cuisine}</p>
    <p>{dish.veg_non_veg}</p>
    </div>
  </div>
  )
}

export default DishResultCard