import { useDispatch } from "react-redux";
import { formatCurrency } from "../helpers/helpers.js";
import { increaseItem, decreaseItem, deleteItem } from "../slices/cartSlice.js";
function CartItem({ item }) {
  // const cart = useSelector((store) => store.cart.cart);
  console.log(item);
  const { pizzaId, name, totalPrice, quantity } = item;
  const dispatch = useDispatch();
  function handleIncreaseQuantity(id) {
    dispatch(increaseItem(id));
  }
  function handleDecreaseItem(id) {
    dispatch(decreaseItem(id));
  }
  function handleDeleteItem(id) {
    dispatch(deleteItem(id));
  }

  return (
    <li className="sm:gap-[5rem] list-none flex   gap-[24rem]  max-sm:gap-[2rem]">
      <div className="flex justify-center items-center">
        <p className="text-nowrap tracking-[1px] font-mono text-stone-600 max-sm:tracking-normal max-sm:text-sm max-sm:text-wrap">
          {quantity}&times; {name}
        </p>
      </div>

      <div className="flex gap-4 justify-end items-center  w-full max-sm:gap-2">
        <p className="text-sm text-stone-600 font-bold">
          {formatCurrency(totalPrice)}
        </p>
        <button
          className="focus:outline-none focus:ring-1 focus:ring-yellow-300 px-2 py-2 w-9 hover:bg-yellow-300 transition-all duration-300 uppercase  text-sm font-semibold  rounded-full   bg-yellow-400   text-slate-800"
          onClick={() => handleDecreaseItem(pizzaId)}
        >
          -
        </button>
        <span className="text-stone-600 font-bold">{quantity}</span>
        <button
          className="focus:outline-none focus:ring-1 focus:ring-yellow-300 px-2 py-2 w-9 hover:bg-yellow-300 transition-all duration-300 uppercase  text-sm font-semibold rounded-full   bg-yellow-400   text-slate-800"
          onClick={() => handleIncreaseQuantity(pizzaId)}
        >
          +
        </button>
        <div>
          <button
            className="focus:outline-none focus:ring-1 focus:ring-yellow-300 px-4 hover:bg-yellow-300 transition-all duration-300 uppercase  text-xs font-semibold rounded-full  h-8 bg-yellow-400   text-slate-800"
            onClick={() => handleDeleteItem(pizzaId)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
