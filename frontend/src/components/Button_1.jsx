/* eslint-disable react/prop-types */
import React from 'react'

const Button_1 = ({name}) => {
  return (
    <button className="get-started group relative md:w-1/2 px-8 py-3 overflow-hidden font-medium rounded-xl border border-yellow-800  text-xl  shadow-2xl shadow-[#ff910025]  my-8">
    <div className="absolute inset-0 w-0 bg-[#ff910032] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <span className=" text-white">{name}</span>
    </button>
  )
}

export default Button_1