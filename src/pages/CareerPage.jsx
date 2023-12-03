import React from "react";
import History from "./HistoryPage";
import  "../styling/CareerPage.css"
import img from "../../public/assets/careerpageimage.jpeg"
import { Link } from 'react-router-dom';
function CareerPage() {
  return (
    <div className="  careerscss  overflow-x-hidden max-w-screen md:flex-row     font-bold   ">
        <div className="flex flex-col  items-center  pb-4 ">

        <h1 className="text-3xl font-semibold title  font-primary mb-2">Welcome To AiChefMaster</h1>
        <p className="title">We're more than just a workplace, we are family</p>
        </div>
        <div  className="card">
            <div className=" image mt-1"><div className="shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"><img width={400} src={img} alt="img" /></div></div>
            <div className="content">
                <h2 className="title text-3xl">Life at <span className="bold text-green-500">AiChefMaster</span></h2>
                <p className="desc">  We know that finding a meaningfull and rewarding career can be a long journey. Our goal is to make that process easy for you & create a work environment that's enriching-one that you will look forward to every day.</p>
            </div>
        </div>
        <div className="flex justify-center items-center">

        <Link to='/signup'>
      <button className="bg-green-600 hover:bg-green-700 group  relative px-8 py-3 overflow-hidden font-medium rounded-xl   text-xl md:text-2xl shadow-2xl  mr-8 my-8">
      <span className=" text-white">View Open Roles</span>
      </button>
      </Link>
        </div>
      
        
    </div>
  );
}

export default CareerPage;
