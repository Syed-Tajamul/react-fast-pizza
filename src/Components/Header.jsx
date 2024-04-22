import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [value, setValue] = useState("");
  const name = useSelector((store) => store.user.name);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  function handleChange(e) {
    e.preventDefault();
    setValue(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${value}`);
  }

  return (
    <header>
      <form
        className="max-sm:flex-col max-sm:gap-2 flex justify-between bg-yellow-400 px-6 py-3 items-center"
        onSubmit={handleSubmit}
      >
        <Link
          className="max-sm:text-nowrap max-sm:tracking-[3px] tracking-[5px]  text-md text-stone-700 max-sm:text-lg"
          to="/"
        >
          FAST REACT PIZZA CO.
        </Link>
        <input
          className="focus:w-[285px] transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 rounded-full w-60 h-8 px-4 py-2 bg-yellow-100"
          type="text"
          placeholder="search  order #"
          onChange={handleChange}
        />
        {name && (
          <p className="font-mono text-slate-600 font-semibold uppercase">
            {name}
          </p>
        )}
      </form>
    </header>
  );
}
