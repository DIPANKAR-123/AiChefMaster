import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


const DashboardForm = () => {
    const {user} = useAuthContext()
  const initialFormState = JSON.parse(localStorage.getItem("formData")) || {
    chef:"",
    dish_picture: null,
    name: "",
    veg_non_veg: "vegetarian", 
    popularity_state: "",
    cuisine: "", 
    course_type: "", 
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

  return (
    <div className="pt-16 w-[90%] lg:w-1/2">
    <div className=" py-6 text-center">
      <p className=" text-3xl font-medium ">
        Enter details of a new dish
      </p>
      <p  className="text-sm italic font-semibold text-zinc-700 py-1">*Before creating a new dish, please use our word search feature to check if it already exists in our database</p>
    </div>

    {/* form  */}
    
      
        <div className="bg-white p-0.5 w-full  rounded-lg shadow-xl">
          <div className="bg-gradient-to-b  relative backdrop-filter backdrop-blur-xl rounded-lg items-center">
          {/* <div className='w-[400px] h-[400px]  rounded-full absolute top-[-40px] left-[-40px] blur-3xl z-[-10] bg-[#14318629]  '></div>  */}
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 lg:p-16 gap-8">

              <div className="flex flex-col pt-4">
                <label
                  htmlFor=""
                  className=" text-md font-medium pb-2"
                >
                  Dish Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="eg Birayni"
                  onChange={inputHandler}
                  value={form.name}
                  className="border px-2 py-1  text-lg  border-black rounded-md placeholder:italic outline-none focus:border-orange-400"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="" className=" text-md font-medium pb-2">
                    Veg or Non-veg
                </label>
                <select
                    name="veg_non_veg"
                    value={form.veg_non_veg}
                    onChange={inputHandler}
                    className=" text-lg border rounded-md p-2   border-black outline-none placeholder:italic focus:border-orange-400"
                    
                >
                    
                    <option className="italic" value="Vegeterian">Vegeterian</option>
                    <option className="italic" value="Non-Vegeratian">Non-Vegetarian</option>
                </select>
                </div>


              <div className="flex flex-col pt-4">
                <label
                  htmlFor=""
                  className=" text-md font-medium pb-2"
                >
                  Popularity State
                </label>

                <input
                  type="text"
                  name="popularity_state"
                  placeholder="Hyderabad"
                  onChange={inputHandler}
                  value={form.popularity_state}
                  className="border px-2 py-1  text-lg  border-black rounded-md placeholder:text-gray-400 placeholder:italic outline-none focus:border-orange-400"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label
                  htmlFor=""
                  className=" text-md font-medium pb-2"
                >
                  Cuisine
                </label>

                <input
                type="text"
                name="cuisine"
                onChange={inputHandler}
                value={form.cuisine}
                className="border px-2 py-1 text-lg  border-black rounded-md placeholder:text-gray-400 outline-none placeholder:italic focus:border-orange-400"
                placeholder="Select Cuisine"
              />
              </div>

              <div className="flex flex-col pt-4">
  <label htmlFor="course_type" className="text-white text-md font-medium pb-2">
    Course Type
  </label>

  <select
    name="course_type"
    onChange={inputHandler}
    value={form.course_type}
    className="border p-2 placeholder:italic  text-lg  border-black rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400"
  >
    <option value="">Select Course Type</option>
    <option value="Appetizers">Appetizers</option>
    <option value="Main Course">Main Course</option>
    <option value="Side Dishes">Side Dishes</option>
    <option value="Desserts">Desserts</option>
    <option value="Beverages">Beverages</option>
    <option value="Breakfast">Breakfast</option>
    <option value="Drinks">Tea or Coffee</option>
    <option value="Brunch">Brunch</option>
    <option value="Snacks">Snacks</option>
  </select>
</div>


              <div className="flex flex-col pt-4">
                <label
                  htmlFor=""
                  className="text-white text-md font-medium pb-2"
                >
                  Cooking Time
                </label>

                <input
                  type="text"
                  name="cooking_time"
                  placeholder="eg. 20min"
                  onChange={inputHandler}
                  value={form.cooking_time}
                  className="border py-1 px-2 placeholder:italic  text-lg  border-black rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400"
                />
              </div>

              

             
            </div>
          </div>
        </div>
        
     
      
    
    <div className="flex items-center justify-center mt-10">
          <button
                onClick={navigateToNextPage}
                className="  bg-zinc-950 hover:bg-zinc-800 px-8 py-3 overflow-hidden font-medium rounded-xl border  text-xl md:text-2xl  "
              >
                
                <span className=" text-white" >Next</span>
          </button>     
    </div>
</div>
  )
}

export default DashboardForm