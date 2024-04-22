import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { newname } from "../slices/userSlice";
export default function Home() {
  const [user, setUser] = useState("");
  const cart = useSelector((store) => store.cart.cart);
  const name = useSelector((store) => store.user.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("hey u clicked");
    dispatch(newname(user));
    navigate("/menu");
  }
  function handleBackToMenu() {
    navigate("/menu");
  }
  return (
    <div className=" flex flex-col gap-6 justify-center items-center text-center mt-[50px] max-sm:mt-[80px] sm:mt-[90px]">
      <div>
        <h3 className="max-sm:text-xl text-stone-600 text-2xl font-semibold tracking-[3px]">
          The best pizza.
        </h3>
        <h1 className="max-sm:text-2xl text-yellow-500 text-3xl font-semibold pt-2  tracking-[3px] max-w-2xl">
          Straight out of the oven, straight to you.
        </h1>
      </div>
      <div>
        {!name && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 justify-center items-center"
          >
            <p className="text-md font-mono  tracking-[1px] text-stone-600">
              👋 Welcome! Please start by telling us your name:
            </p>
            <input
              className="transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 rounded-full w-[270px] h-10 px-4 py-2 border-2 border-slate-200 "
              type="text"
              placeholder="Your full name"
              onChange={(e) => setUser(e.target.value)}
            />

            {user && (
              <button className="hover:bg-yellow-300 transition-all duration-300 uppercase  text-sm font-semibold mt-4 rounded-full w-40 h-12 bg-yellow-400 px-4  text-slate-800">
                Start Ordering
              </button>
            )}
          </form>
        )}

        {name && (
          <button
            className="max-sm:text-xs max-sm:px-2 hover:bg-yellow-300 transition-all duration-300 uppercase  text-sm font-medium mt-4 rounded-full  h-12 bg-yellow-400 px-5 py-4  text-slate-800 text-nowrap"
            onClick={handleBackToMenu}
          >
            {`...continue ordering , ${name}`}
          </button>
        )}
      </div>
    </div>
  );
}
