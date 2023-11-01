import React, { useState, useEffect } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Overview from "../components/Overview";
import { AiOutlineClose } from "react-icons/ai";

const InstructionsPage = () => {
  const navigate = useNavigate();

  const initialFormData = JSON.parse(localStorage.getItem("formData")) || {
    ingredients: [],
    instructions: [],
  };
  const [form, setForm] = useState(initialFormData);
 

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [newInstruction, setNewInstruction] = useState("");


  const btnHandler = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData, form]);

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
      <div className="bg-gradient-to-b from-zinc-500 to-black p-0.5 w-1/2 rounded-lg">
        <div className="bg-gradient-to-b from-zinc-950 to-black items-center relative backdrop-filter backdrop-blur-xl rounded-lg">
          <div className='w-[400px] h-[400px] rounded-full absolute top-[-40px] left-[-40px] blur-3xl z-[-10] bg-[#14318629]'></div>
          <div className="flex flex-col pt-10 px-10">
            <label htmlFor="" className="text-white text-2xl text-center  font-semibold pb-2">
              Ingredients
            </label>
            <div className="bg-gradient-to-b from-slate-900 to-transparent rounded-xl p-4 py-8 flex flex-col justify-center items-center">
              <form onSubmit={handleIngredientSubmit} className="w-full">
                <ul className="flex flex-wrap gap-4 my-2 w-full">
                  {formData.ingredients.map((ingredient, index) => (
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
                      className="px-2 my-2 py-1 text-white text-lg w-full border border-zinc-700 bg-black rounded-md placeholder:italic outline-none"
                    />
                  </div>

                  <div className="w-full lg:w-1/2 py-4">
                    <label className="text-white block">Quantity</label>
                    <input
                      type="text"
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
                    type="submit"
                    className="text-white bg-zinc-600 p-2 my-4 mx-auto rounded-md hover-bg-zinc-400"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Instructions */}
          <div className="pl-10 pt-4">
            <p className="text-white text-2xl text-center font-semibold">Instructions</p>
          </div>

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
                    <IoIosClose className="text-rose-600 border border-rose-600 rounded-full hover-bg-[#361316] text-3xl" />
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
                <button onClick={addInstruction} className="px-4 ">
                      <IoIosAdd className="text-green-500 text-3xl rounded-full border border-green-600 hover-bg-[#133615]" />
                </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center">

            <button
                  onClick={btnHandler}
                  className="get-started group relative px-8 py-3 overflow-hidden font-medium rounded-xl border border-yellow-800 text-xl md:text-2xl shadow-2xl shadow-[#ff910025] mr-8 my-8"
                >
                  <div className="absolute inset-0 w-0 bg-[#ff910032] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                  <span className="text-white">Overview</span>
                </button>
              <button
                onClick={navigateToNextPage}
                className="get-started group relative px-8 py-3 overflow-hidden font-medium rounded-xl border border-yellow-800 text-xl md-text-2xl shadow-2xl shadow-[#ff910025] mr-8 my-8"
              >
                <div className="absolute inset-0 w-0 bg-[#ff910032] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="text-white">Back</span>
              </button>
              {open ? (
          <div className="absolute top-0 bg-gradient-to-b from-[#00000011] backdrop-filter shadow-xl backdrop-blur-xl to-black w-full  h-full rounded-xl bg-gradient text-2xl text-white p-4">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={btnHandler}
                className="cursor-pointer text-3xl text-red-500 hover:bg-slate-400 rounded-full"
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
      </div>
    </div>
  );
};

export default InstructionsPage;
