import React, { useState } from "react";
import { LuChefHat } from "react-icons/lu";
import Overview from "../components/Overview";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const DashboardPage = () => {
  const initialFormState = JSON.parse(localStorage.getItem("formData")) || {
    name: "",
    veg_non_veg: "vegetarian", // Changed to radio button with default value
    popularity_state: "",
    cuisine: "", // Changed to dropdown
    course_type: "", // Changed to dropdown
    cooking_time: "",
    ingredients: [],
    instructions: [],
    
  };

  const userToken = JSON.parse(localStorage.getItem("user"));

  console.log("user Token", userToken.access_token);

  const [form, setForm] = useState(initialFormState);

  const [open, setOpen] = useState(false);

  const saveFormDataToLocalStorage = (form) => {
    localStorage.setItem("formData", JSON.stringify(form));
  };

  const clearFormDataFromLocalStorage = () => {
    localStorage.removeItem("formData");
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

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(form);
    try {
      const response = await fetch("http://localhost:8000/api/dish/create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Dish created successfully:", responseData);
        toast.success("Dish Created");
      } else {
        console.error("Error creating dish:", response.statusText);
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Something went wrong");
    }

    setForm(initialFormState);
    clearFormDataFromLocalStorage();
  };

  const btnHandler = () => {
    setOpen((prev) => !prev);
  };

const navigate = useNavigate();

const navigateToNextPage = () => {
  navigate('/dashboard/instruction');
};
  const cuisineOptions = ["Indian", "Chinese", "Italian", "Japanese"]; // Add your desired cuisine options
  const courseTypeOptions = ["Breakfast", "Lunch", "Dinner", "Snack"]; // Add your desired course type options

  return (
    <div className="w-screen h-full pt-24 font-primary">
      {/* heading  */}
      <div className="flex items-center justify-center gap-3">
        <p className="text-white font-semibold text-4xl">Welcome Chef </p>
        <p className="text-[#FF8A00] text-3xl ">
          <LuChefHat />
        </p>
      </div>

      {/* underline  */}
      <div className="w-screen flex items-center justify-center">
        <div className="h-2 w-72 flex-shrink-0 bg-gradient-to-r from-[#FF8A00] to-[#000]"></div>
      </div>

      <div className="relative pt-10">
        <div className="translate-x-1/4 pl-2 py-3">
          <p className="text-white text-2xl font-semibold">
            Enter details of a new dish
          </p>
        </div>

        {/* form  */}
        <div className="p-1 translate-x-1/4">
          <form action="" onSubmit={submitHandler}>
            <div className="bg-gradient-to-b from-zinc-500 to-black p-0.5 w-2/4 rounded-lg">
              <div className="bg-gradient-to-b from-zinc-950 to-black relative backdrop-filter backdrop-blur-xl rounded-lg items-center">
              <div className='w-[400px] h-[400px]  rounded-full absolute top-[-40px] left-[-40px] blur-3xl z-[-10] bg-[#14318629]  '></div> 
                <div className="grid grid-cols-2 px-10 gap-10">

                  <div className="flex flex-col pt-10">
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

                  <div className="flex flex-col pt-10">
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
                        value="vegetarian"
                        checked={form.veg_non_veg === "vegetarian"}
                        onChange={inputHandler}
                      />
                      <label className="text-white">Vegetarian</label>
                    </div>

                    <div>
                      <input
                        className=""
                        type="radio"
                        name="veg_non_veg"
                        value="non-vegetarian"
                        checked={form.veg_non_veg === "non-vegetarian"}
                        onChange={inputHandler}
                      />
                      <label className="text-white">Non-vegetarian</label>
                    </div>
                    </div>
                  </div>

                  <div className="flex flex-col pt-2">
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

                  <div className="flex flex-col pt-2">
                    <label
                      htmlFor=""
                      className="text-white text-xl font-semibold pb-2"
                    >
                      Cuisine
                    </label>

                    <select
                      name="cuisine"
                      onChange={inputHandler}
                      value={form.cuisine}
                      className="border px-2 py-1 text-white text-lg bg-[#060606] border-slate-500 rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400"
                    >
                      <option value="">Select Cuisine</option>
                      {cuisineOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col pt-2">
                    <label
                      htmlFor=""
                      className="text-white text-xl font-semibold pb-2"
                    >
                      Course Type
                    </label>

                    <select
                      name="course_type"
                      onChange={inputHandler}
                      value={form.course_type}
                      className="border px-2 py-1 text-white text-lg bg-[#060606] border-slate-500 rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400"
                    >
                      <option value="">Select Course Type</option>
                      {courseTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
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

                  <div className="flex flex-col">
                    <label
                      htmlFor=""
                      className="text-white text-xl font-semibold pb-2"
                    >
                      Number of People
                    </label>

                    <input
                      type="number"
                      name="quantity"
                      placeholder="eg. 2"
                      onChange={inputHandler}
                      value={form.quantity}
                      className="border px-2 py-1 text-white text-lg bg-[#060606] border-slate-500 rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400"
                    />
                  </div>

                 
                </div>
              </div>
            </div>
            
          </form>
          
        </div>
        <div className="flex items-center justify-center mt-10">
              <div className="flex items-center justify-center">
                
              </div>
              <div className="flex items-center justify-center">
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
      <Toaster />
    </div>
  );
};

export default DashboardPage;
