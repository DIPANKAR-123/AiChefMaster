import React, { useEffect, useState } from "react";
import { LuChefHat } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";



const DashboardPage = () => {
  const {user} = useAuthContext()
  const initialFormState = JSON.parse(localStorage.getItem("formData")) || {
    chef:"",
    dish_picture: null,
    name: "",
    veg_non_veg: "vegetarian", // Changed to radio button with default value
    popularity_state: "",
    cuisine: "", // Changed to dropdown
    course_type: "", // Changed to dropdown
    cooking_time: "",
    ingredients: [],
    instructions: [],
    
  };

  
 
  

  

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (user && user.account_id) {
      const updatedFormData = { ...form, chef: user.account_id };
      localStorage.setItem("formData", JSON.stringify(updatedFormData));
    }
  }, [form]);


  const saveFormDataToLocalStorage = (form) => {
    localStorage.setItem("formData", JSON.stringify(form));
  };

 

  const inputHandler = (e) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...form,
      [name]: value,
    };
    setForm(updatedForm);
    saveFormDataToLocalStorage(updatedForm);
  };

  

  
const navigate = useNavigate();

const navigateToNextPage = () => {
  navigate('/dashboard/instruction');
};

 
  const courseTypeOptions = ["Breakfast", "Main Course", "Dessert", "Snack"]; 

  return (
    <div className="w-screen h-full mt-36 px-4 overflow-x-hidden font-primary flex flex-col justify-center items-center">
      {/* heading  */}
      <div className="flex items-center justify-center gap-3">
        <p className="text-white font-semibold text-4xl">Welcome Chef </p>
        <p className="text-[#FF8A00] text-3xl ">
          <LuChefHat />
        </p>
      </div>

      {/* underline  */}
      <div className="w-full  flex items-center justify-center">
        <div className="h-1 w-72 flex-shrink-0 bg-gradient-to-r from-[#FF8A00] to-[#000]"></div>
      </div>

      {/* <div className=" py-8  ">
          <div className="w-screen flex flex-col  justify-center items-center px-4 ">
            
      <input
        type="text"
        name="dish_search"
        placeholder="Search for a dish ..."
        className="w-full lg:w-1/2 border  px-2 py-1 text-white text-lg bg-black border-slate-500 rounded-md placeholder:italic outline-none focus:border-orange-400 "
       />

       <button className="text-white py-2 border hover:bg-amber-800  border-amber-600 my-4 rounded-md px-2 items-end">Search</button>
       </div>
      </div> */}

      {/* RESULTS CARDS */}

      {/* <div className="bg-zinc-900 text-white p-4 rounded-xl">
        <p className="text-2xl">Biryani</p>
        <p>Popularity State - Hyderabad</p>
        <p>Cuisine - Indian</p>
        <p>Course Type - Main Course</p>
      </div> */}


      {/* CREATE DISH  */}

      <div className="pt-16 w-[90%] lg:w-1/2">
        <div className=" py-3">
          <p className="text-white text-2xl font-semibold">
            Enter details of a new dish
          </p>
        </div>

        {/* form  */}
        
          
            <div className="bg-gradient-to-b from-zinc-500 to-black p-0.5 w-full  rounded-lg">
              <div className="bg-gradient-to-b from-zinc-950 to-black relative backdrop-filter backdrop-blur-xl rounded-lg items-center">
              <div className='w-[400px] h-[400px]  rounded-full absolute top-[-40px] left-[-40px] blur-3xl z-[-10] bg-[#14318629]  '></div> 
                <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-8">

                  <div className="flex flex-col pt-4">
                    <label
                      htmlFor=""
                      className="text-white text-xl font-semibold pb-2"
                    >
                      Dish Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="eg Birayni"
                      onChange={inputHandler}
                      value={form.name}
                      className="border px-2 py-1 text-white text-lg bg-black border-slate-500 rounded-md placeholder:italic outline-none focus:border-orange-400"
                    />
                  </div>

                  <div className="flex flex-col pt-4">
                    <label
                      htmlFor=""
                      className="text-white text-xl font-semibold pb-2"
                    >
                      Veg or Non-veg
                    </label>
                    <div className="flex gap-8">
                    <div>
                      <input
                        type="radio"
                        name="veg_non_veg"
                        value="Vegeterian"
                        checked={form.veg_non_veg === "Vegeterian"}
                        onChange={inputHandler}
                      />
                      <label className="text-white px-2">Vegeterian</label>
                    </div>

                    <div>
                      <input
                        className=""
                        type="radio"
                        name="veg_non_veg"
                        value="NonVeg"
                        checked={form.veg_non_veg === "NonVeg"}
                        onChange={inputHandler}
                      />
                      <label className="text-white px-2">Non-Vegetarian</label>
                    </div>
                    </div>
                  </div>

                  <div className="flex flex-col pt-4">
                    <label
                      htmlFor=""
                      className="text-white text-xl font-semibold pb-2"
                    >
                      Popularity State
                    </label>

                    <input
                      type="text"
                      name="popularity_state"
                      placeholder="Hyderabad"
                      onChange={inputHandler}
                      value={form.popularity_state}
                      className="border px-2 py-1 text-white text-lg bg-[#060606] border-slate-500 rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400"
                    />
                  </div>

                  <div className="flex flex-col pt-4">
                    <label
                      htmlFor=""
                      className="text-white text-xl font-semibold pb-2"
                    >
                      Cuisine
                    </label>

                    <input
                    type="text"
                    name="cuisine"
                    onChange={inputHandler}
                    value={form.cuisine}
                    className="border px-2 py-1 text-white text-lg bg-[#060606] border-slate-500 rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400"
                    placeholder="Select Cuisine"
                  />
                  </div>

                  <div className="flex flex-col pt-4">
                    <label
                      htmlFor=""
                      className="text-white text-xl font-semibold pb-2"
                    >
                      Course Type
                    </label>

                    <input
                  type="text"
                  name="course_type"
                  onChange={inputHandler}
                  value={form.course_type}
                  className="border px-2 py-1 text-white text-lg bg-[#060606] border-slate-500 rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400"
                  placeholder="Select Course Type"
                />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor=""
                      className="text-white text-xl font-semibold pb-2"
                    >
                      Cooking Time
                    </label>

                    <input
                      type="text"
                      name="cooking_time"
                      placeholder="eg. 20min"
                      onChange={inputHandler}
                      value={form.cooking_time}
                      className="border px-2 py-1 text-white text-lg bg-[#060606] border-slate-500 rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400"
                    />
                  </div>

                  

                 
                </div>
              </div>
            </div>
            
         
          
        
        <div className="flex items-center justify-center mt-10">
              <button
                    onClick={navigateToNextPage}
                    className="get-started group relative px-8 py-3 overflow-hidden font-medium rounded-xl border border-yellow-800  text-xl md:text-2xl shadow-2xl shadow-[#ff910025] mr-8 my-8"
                  >
                    <div className="absolute inset-0 w-0 bg-[#ff910032] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                    <span className=" text-white" >Next</span>
              </button>     
        </div>
</div>
      
    </div>
  );
};

export default DashboardPage;
