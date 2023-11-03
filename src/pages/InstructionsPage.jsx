import React, { useState, useEffect } from "react";
import { IoIosAdd, IoIosClose, IoIosPaper, IoIosPie } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Overview from "../components/Overview";
import { AiOutlineClose } from "react-icons/ai";
import { useAuthContext } from "../hooks/useAuthContext";
import toast, { Toaster } from "react-hot-toast";

const InstructionsPage = () => {

  const navigate = useNavigate();
  const userToken = JSON.parse(localStorage.getItem("user"));

  const initialFormData = JSON.parse(localStorage.getItem("formData")) || {
    
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

  const successInitialFormData = {
    dish_picture: null,
    name: "",
    veg_non_veg: "vegetarian", // Changed to radio button with default value
    popularity_state: "",
    cuisine: "", // Changed to dropdown
    course_type: "", // Changed to dropdown
    cooking_time: "",
    ingredients: [],
    instructions: [],
  }

  const [form, setForm] = useState(initialFormData);
  const {user} = useAuthContext()

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState(0);
  const [newInstruction, setNewInstruction] = useState("");
  const [isLoading, setisLoading] = useState(false)

  const btnHandler = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (user && user.account_id) {
      const updatedFormData = { ...formData, chef: user.account_id };
      localStorage.setItem("formData", JSON.stringify(updatedFormData));
    }
  }, [formData]);


  const clearFormDataFromLocalStorage = () => {
    localStorage.removeItem("formData");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);
  console.log(formData)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/dish/create/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setisLoading(false)
        const responseData = await response.json();
        console.log("Dish created successfully:", responseData);
        toast.success("Dish Created");
        localStorage.removeItem("formData");
         setFormData(successInitialFormData)
      } else {
        setisLoading(false)
        const errorData = await response.json();
        console.error("Error creating dish:", response.statusText);
        toast.error(errorData.message || "Something went wrong");
        console.log(formData)
      }
    } catch (error) {
      setisLoading(false)
      console.error("An error occurred:", error);
      toast.error("Something went wrong");
    }
    
    
    
  };
  

  

  const removeIngredient = (name) => {
    const updatedIngredients = formData.ingredients.filter(
      (ingredient) => ingredient.name !== name
    );
    setFormData((prevData) => ({
      ...prevData,
      ingredients: updatedIngredients,
    }));
  };

  const handleIngredientSubmit = (e) => {
    e.preventDefault();
    if (ingredientName && ingredientQuantity) {
      const newIngredient = {
        name: ingredientName,
        quantity: ingredientQuantity,
      };
      setFormData((prevData) => ({
        ...prevData,
        ingredients: [...prevData.ingredients, newIngredient],
      }));
      setIngredientName("");
      setIngredientQuantity("");
    }
  };

  const addInstruction = () => {
    if (newInstruction) {
     
      setFormData((prevData) => ({
        ...prevData,
        instructions: [...prevData.instructions,{ step: newInstruction, instruction_video_url: "" }
      ],
      }));
      setNewInstruction("");
    }
  };

  const removeInstruction = (index) => {
    const updatedInstructions = formData.instructions.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      instructions: updatedInstructions,
    }));
  };

  const navigateToNextPage = () => {
    navigate("/dashboard", { state: { inputData: formData } });
  };

  return (
    <div className="mt-32 w-screen h-full font-primary flex justify-center items-center">

      <form action=""  className="bg-gradient-to-b from-zinc-500 to-black p-0.5 w-[90%] lg:w-3/4 rounded-lg">
        <div className="bg-gradient-to-b from-zinc-950 to-black items-center relative backdrop-filter backdrop-blur-xl rounded-lg">
          <div className='w-[400px] h-[400px] rounded-full absolute top-[-40px] left-[-40px] blur-3xl z-[-10] bg-[#14318629]'></div>
          <div className="flex flex-col p-4 w-full">
            <p  className="text-white text-3xl text-center flex justify-center items-center gap-2 font-medium pb-2">
              Ingredients <IoIosPie/>
            </p>
            <div className="bg-transparent rounded-xl p-4 py-8 flex flex-col justify-center items-center">
              <div className="w-full">
                <ul className="flex flex-wrap gap-4 my-2 w-full">
                  {formData.ingredients.length>0 && formData.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="bg-amber-600 font-medium flex rounded-md items-center gap-2 px-2 py-1"
                    >
                      <span>
                        {ingredient.name} - {ingredient.quantity}
                      </span>
                      <IoIosClose
                        onClick={() => removeIngredient(ingredient.name)}
                        className="text-xl cursor-pointer text-black border border-black rounded-full"
                      />
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="w-full lg:w-1/2 py-4">
                    <label className="text-white block">Name</label>
                    <input
                      type="text"
                      name="ingredient_name"
                      value={ingredientName}
                      onChange={(e) => setIngredientName(e.target.value)}
                      placeholder="eg. Chicken"
                      className="px-2 my-2 py-1 text-white text-lg w-full border border-zinc-700 bg-black rounded-md focus:border-orange-400 placeholder:italic outline-none"
                    />
                  </div>

                  <div className="w-full lg:w-1/2 py-4">
                    <label className="text-white block">Quantity</label>
                    <input
                      type="number"
                      name="ingredient_quantity"
                      value={ingredientQuantity}
                      onChange={(e) => setIngredientQuantity(e.target.value)}
                      placeholder="eg. 200gm"
                      className="px-2 my-2 py-1 text-white text-lg w-full border border-zinc-700 bg-black rounded-md placeholder:italic outline-none"
                    />
                  </div>
                </div>
                <div>
                  <button
                  onClick={handleIngredientSubmit}
                    type="submit"
                    className="text-white bg-zinc-600 p-2 my-4 mx-auto rounded-md hover-bg-zinc-400"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          
            <p className="text-white text-3xl text-center flex items-center justify-center gap-2 font-medium">Instructions <IoIosPaper/></p>
          

          <div className=" ">
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="w-full pt-3 px-2 md:px-4 lg:px-8 ">
              <div className="items-center w-full lg:w-3/4">
                <div className="text-white font-medium text-md flex w-full ">
                  <span className="text-white px-4 max-w-full flex gap-2">
                    <p>Step</p> <p>{index + 1} </p>  <p> -</p>
                  </span>
                  <p className="flex max-w-full break-all">{instruction.step}</p>
                  <button onClick={() => removeInstruction(index)} className=" mx-2">
                    <IoIosClose className="text-rose-600 border border-rose-600 rounded-full hover:bg-[#361316] text-3xl" />
                  </button>
                </div>
              </div>
            </div>
            ))}
            <div className="flex full pt-3 px-8 ">
              <div className="items center w-full lg-w-3/4">
                <label className="text-white font-medium text-md">New Step</label>
                <div className="flex flex-row pt-2 justify-center items-center">
                <textarea
                  type="textarea"
                  name="new_instruction"
                  value={newInstruction}
                  onChange={(e) => setNewInstruction(e.target.value)}
                  placeholder={`Enter a new step`}
                  className="border border-zinc-700 w-full px-4 py-1  text-white text-lg bg-black rounded-md placeholder:italic placeholder-text-sm outline-none focus-border-orange-400"
                />
                <button onClick={addInstruction} type="button" className="px-4 ">
                      <IoIosAdd className="text-green-500 text-3xl rounded-full border border-green-600 hover:bg-[#133615]" />
                </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center">

            <button
            type="button"
                  onClick={btnHandler}
                  className="get-started group relative px-8 py-3 overflow-hidden font-medium rounded-xl border border-yellow-800 text-xl md:text-2xl shadow-2xl shadow-[#ff910025] mr-8 my-8"
                >
                  <div className="absolute inset-0 w-0 bg-[#ff910032] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                  <span className="text-white">Overview</span>
                </button>
              <button
              type="button"
                onClick={navigateToNextPage}
                className="get-started group relative px-8 py-3 overflow-hidden font-medium rounded-xl border border-yellow-800 text-xl md-text-2xl shadow-2xl shadow-[#ff910025] mr-8 my-8"
              >
                <div className="absolute inset-0 w-0 bg-[#ff910032] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="text-white">Back</span>
              </button>

            <button
              onClick={submitHandler}
              className={`${
                isLoading ? 'cursor-wait' : 'cursor-pointer'
              } get-started group relative px-8 py-3 overflow-hidden font-medium rounded-xl border border-yellow-800 text-xl md:text-2xl shadow-2xl shadow-[#ff910025] mr-8 my-8`}
            >
              <div className="absolute inset-0 w-0 bg-[#ff910032] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span className="text-white">Submit</span>
            </button>



              {open ? (
          <div className="absolute top-0 bg-gradient-to-b from-[#00000011] backdrop-filter shadow-xl backdrop-blur-xl to-black w-full  h-full rounded-xl bg-gradient  text-white p-4">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={btnHandler}
                className="cursor-pointer text-3xl text-rose-600 border border-rose-500 p-1  hover:bg-[#361316] rounded-full"
              />
            </div>
            <Overview form={formData} />
          </div>
        ) : (
          ""
        )}
            </div>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default InstructionsPage;
